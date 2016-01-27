const React = require('react'),
      ReactDOM =  require('react-dom');

var lastPosition = null;

function getMoveDirection(nowP, lastP){
  if(lastP == null) return [0, 0];
  return [nowP.clientX - lastP.clientX, nowP.clientY - lastP.clientY]
}

function disableTouch(e){
  const node = ReactDOM.findDOMNode(this.refs.popup_box).children[0],
        nowPosition = e.originalEvent.touches[0],
        movePos = getMoveDirection(nowPosition, lastPosition);

  if( ((movePos[1] > 0) && (node.offsetHeight + node.scrollTop >= node.scrollHeight))
      || ( (movePos[1] < 0) && (node.scrollTop <= 0) ) ){
    e.preventDefault();
  }

  lastPosition = nowPosition;
}

function getBody(){
  return document.getElementsByTagName('body')[0];
}

var oldOverFlowStyleForBody = '';

module.exports = React.createClass({
  componentWillMount: function(){
    var body = getBody();
    
    oldOverFlowStyleForBody = body.style.overflow;
    body.style.overflow = 'hidden';

    body.addEventListener('touchmove', disableTouch.bind(this));
  },

  componentWillUnmount: function(){
    var body = document.getElementsByTagName('body')[0];
    body.style.overflow = oldOverFlowStyleForBody;
    body.removeEventListener('touchmove', disableTouch.bind(this));
  },

  render: function(){
    return React.createElement('div', {className: 'over-scroll-stopper-overlay', ref: 'popup_box'}, this.props.children);
  }
});
