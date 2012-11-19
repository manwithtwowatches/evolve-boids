evolve-boids

Usnig Box2d there are a bunch of circles flying about on a canvas leaving trails behind them. They're moving using approximately a boids swarm algorithm and the parameters are changed to make them form different kinds of movements. The parameters are generated from a gene which defines the proportions between them, and I want to get it so that the genes are stored on the server and bred using a genetic algorithm. Whether the user likes what they see or not would be the fitness function, and perhaps over enough time the server would breed genes that produce patterns that people like. I haven't done the GA part yet though, it's just using a test gene. Also I suspect that currently the parameters that can be generated from a gene can differ so wildly that the link between them and the gene will mean that any aesthetic properties will be lost in the wind... but who knows!


============