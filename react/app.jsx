// class HelloWorld extends React.Component{
let HelloWorld = React.createClass({
    getInitialState(){
        console.log('init');
        return {
            opacity:1,
            color:'red',
            fontSize:'18px'
        }
    },
	render(){
		return(
            <h1 style={this.state}>Hello world!</h1>
        );
	},
    componentWillMount(){
        console.log('Will');
    },
    componentDidMount(){
        console.log('Did');
        let that = this;
        window.setTimeout(()=>{
            that.setState({
                opacity:0.5,
                color:'pink',
                fontSize:'48px'
            });
        },1000);
    }
});
React.render(
	<HelloWorld/>,
	document.getElementById('content')
);