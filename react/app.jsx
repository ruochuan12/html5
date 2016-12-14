class HelloWorld extends React.Component{
	render(){
		return(
			<h1 className="color:red;">Hello world!</h1>
		);
	}
}
React.render(
	<HelloWorld/>
	document.getElementById('content')
);