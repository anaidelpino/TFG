var React = require('react');

var NavBar = React.createClass({
	render: function(){
		return(
			<div className="row">
				<nav className= "navbar navbar-default" role= "navigation">
					<div className= "navbar-header">
						header
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-exl-collapse">
							<span className="sr-only">Desplegar navegación</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a>className="navbar-brand"EJEMPLO</a>
					</div>
					<div className="collapse navbar-collapse navbar-exl-collapse">
						<ul className="nav navbar-nav">
						</ul>

					</div>
				</nav>
			</div>
			);
	}
});

module.exports = NavBar;

