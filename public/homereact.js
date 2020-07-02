'use strict';
const e = React.createElement;
class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }
  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }
    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}
const element = <h1>FoodSens</h1>; 
ReactDOM.render(element, document.getElementById('welcome'));
const testRoot = document.getElementById('test');
ReactDOM.render(e(LikeButton), testRoot);
