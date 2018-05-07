import React, {Component} from 'react';

class DropDown extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    var options = this.props.optionsList,    
    OptionsGenerator = function(each) {
        return <option key={each.toString()}>{each}</option>;
    };
      
    return (
      <div>
        <select className="form-control col-sm-4">{options.props.map(OptionsGenerator)}</select>          
      </div>
    );
  }
}
export default DropDown;

