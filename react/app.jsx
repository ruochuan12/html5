class HelloWorld extends React.Component{
	render(){
		return(
			<h1>Hello world!</h1>
		);
	}
}
React.render(
	<HelloWorld/>
	document.getElementById('content')
);