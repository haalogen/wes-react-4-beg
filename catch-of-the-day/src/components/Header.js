import React from 'react';

// Stateless function
// Don't create React.Component if only render() method is needed
const Header = (props) => (
  <header className="top">
    <h1>
      Catch
      <span className="ofThe">
        <span className="of">of</span>
        <span className="the">the</span>
      </span>
      Day
    </h1>
    <h3 className="tagline">
      <span>{props.tagline}</span>
    </h3>
  </header>
)

// propTypes are needed for validation of props passed to component
// (for future users of component to know what to pass)
Header.propTypes = {
  tagline: React.PropTypes.string.isRequired
}


export default Header;