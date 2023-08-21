const canvas = document.createElement('canvas'),
			context = canvas.getContext('2d'),
			particles = []

let width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		halfWidth = width / 2,
		halfHeight = height / 2,
		scale = Math.min(width, height),
		startTime = new Date().getTime(),
		now = new Date().getTime(),
		shape = null,
		lastShape = null

document.body.appendChild(canvas)

const shapes = {
	square: {
		size: .25,
		points: [[-1,1],[1,1],[1,-1],[-1,-1]]
	},
	rhombus: {
		size: .25,
		points: [[0,-1],[.5,0],[0,1],[-.5,0]]
	},
	star: {
		size: .35,
		points: [[0,-1],[-0.224,-0.309],[-0.951,-0.309],[-0.361,0.118],[-0.588,0.809],[0,0.382],[0.588,0.809],[0.361,0.118],[0.951,-0.309],[0.224,-0.309]]
	},
	cross: {
		size: .25,
		points: [[-.3, -1],[.3,-1],[.3,-.3],[1,-.3],[1,.3],[.3,.3],[.3,1],[-.3,1],[-.3,.3],[-1,.3],[-1,-.3],[-.3,-.3]]
	}
}

function buildShape(name, sides = 3, size = .25){
	let points = []
	let r = (Math.PI * 2 / sides)
	let r2;
	for(let i = 0; i < sides; i++){
		r2 = r * i
		points.push([Math.cos(r2), Math.sin(r2)])
	}
	shapes[name] = { size, points}
}

buildShape('diamond',4, .35)
buildShape('triangle',3)
buildShape('hexagon',6)
buildShape('circle',100)

const updateShape = () => {
	let newShape = shapes[Object.keys(shapes)[Math.floor(Math.random() * Object.keys(shapes).length)]]
	if(newShape == lastShape) return updateShape()
	shape = newShape
}


class particle {
	position = { x: 0, y: 0 }
	velocity = { x: 0, y: 0 }
	friction = .96

	constructor(){
		let avgShapeSize = Math.min(width, height) * .25
		this.position = { 
			x: Math.random() * avgShapeSize - avgShapeSize / 2, 
			y: Math.random() * avgShapeSize - avgShapeSize / 2
		}

		particles.push(this)
		this.nudge()
	}

	nudge = (amount) => {
		if(!amount) {
			amount = 4 + Math.random() * 3
		}
		let angle;
		let random = Math.random();
		if(random < .2) { angle = Math.atan2(-this.position.x, -this.position.y); amount *= .8; }
		else if(random < .4) { angle = Math.atan2(this.position.x, this.position.y); amount *= .8; }
		else angle = Math.random() * Math.PI * 2
		angle += Math.random() * 2 - 1
		
		this.velocity = {
			x: this.velocity.x + Math.sin(angle) * amount,
			y: this.velocity.y + Math.cos(angle) * amount,
		}
	}

	update = () => {
		let { x, y } = this.position;
		if(shape){
			const shapePoints = shape.points;

			// Find the nearest line segment on the shape to the current point
			let nearestSegmentStart = [shapePoints[0][0] * shape.size * scale, shapePoints[0][1] * shape.size * scale];
			let nearestSegmentEnd = [shapePoints[shapePoints.length - 1][0] * shape.size * scale, shapePoints[shapePoints.length - 1][1] * shape.size * scale];
			let minDistanceToSegment = this.distanceToSegment(x, y, nearestSegmentStart[0], nearestSegmentStart[1], nearestSegmentEnd[0], nearestSegmentEnd[1]);

			for (let i = 1; i < shapePoints.length; i++) {
				const segmentStart = [shapePoints[i - 1][0] * shape.size * scale, shapePoints[i - 1][1] * shape.size * scale];
				const segmentEnd = [shapePoints[i][0] * shape.size * scale, shapePoints[i][1] * shape.size * scale];
				const distanceToSegment = this.distanceToSegment(x, y, segmentStart[0], segmentStart[1], segmentEnd[0], segmentEnd[1]);
				if (distanceToSegment < minDistanceToSegment) {
					minDistanceToSegment = distanceToSegment;
					nearestSegmentStart = segmentStart;
					nearestSegmentEnd = segmentEnd;
				}
			}

			// Calculate the projection of the current position onto the nearest line segment
			const projectedPoint = this.projectPointOntoSegment(x, y, nearestSegmentStart[0], nearestSegmentStart[1], nearestSegmentEnd[0], nearestSegmentEnd[1]);

			// Move the current position towards the projected point
			const moveAmount = 0.038; // Adjust this value to control the speed of movement
			x = x + (projectedPoint[0] - x) * moveAmount;
			y = y + (projectedPoint[1] - y) * moveAmount;
		}

		x += this.velocity.x;
		y += this.velocity.y;
		this.velocity.x *= this.friction;
		this.velocity.y *= this.friction;

		this.position = { x, y };
	}

	distanceToSegment = (x, y, x1, y1, x2, y2) => {
		const A = x - x1;
		const B = y - y1;
		const C = x2 - x1;
		const D = y2 - y1;

		const dot = A * C + B * D;
		const lenSq = C * C + D * D;
		let param = -1;

		if (lenSq !== 0) // to avoid division by 0
			param = dot / lenSq;

		let xx, yy;

		if (param < 0) {
			xx = x1;
			yy = y1;
		} else if (param > 1) {
			xx = x2;
			yy = y2;
		} else {
			xx = x1 + param * C;
			yy = y1 + param * D;
		}

		const dx = x - xx;
		const dy = y - yy;
		return Math.sqrt(dx * dx + dy * dy);
	}

	projectPointOntoSegment = (x, y, x1, y1, x2, y2) => {
		const A = x - x1;
		const B = y - y1;
		const C = x2 - x1;
		const D = y2 - y1;

		const dot = A * C + B * D;
		const lenSq = C * C + D * D;
		let param = -1;

		if (lenSq !== 0) // to avoid division by 0
			param = dot / lenSq;

		let xx, yy;

		if (param < 0) {
			xx = x1;
			yy = y1;
		} else if (param > 1) {
			xx = x2;
			yy = y2;
		} else {
			xx = x1 + param * C;
			yy = y1 + param * D;
		}

		return [xx, yy];
	}

	distance = (x1, y1, x2, y2) => {
		const dx = x2 - x1;
		const dy = y2 - y1;
		return Math.sqrt(dx * dx + dy * dy);
	}

	draw = () => {
		let { x, y } = this.position
		context.fillStyle = 'rgba(255,255,255,0.5)'
		context.fillRect(x + width / 2, y + height / 2, 1, 1)
	}

	render = () => {
		this.update()
		this.draw()
	}
}



const render = () => {
	context.clearRect(0,0,width,height)
	particles.map(p => p.render())
	window.requestAnimationFrame(render)
}

updateShape()
setInterval(() => {
	lastShape = shape
	shape = null
	particles.map(p => p.nudge())
	//setTimeout(() => {
		updateShape()
	//}, 800)
}, 3400)

for(let i = 0; i < 3000; i++){
	let p = new particle()
	}
render()

window.addEventListener('resize', () => {
	width = canvas.width = window.innerWidth
	height = canvas.height = window.innerHeight
	halfWidth = width / 2
	halfHeight = height / 2
	scale = Math.min(width, height)
})