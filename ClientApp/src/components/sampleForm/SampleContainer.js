import React from 'react';
import Counter from './Counter';
import GithubUsers from './GithubUsers';
import ControlledForm from './ControlledForm';

class SampleContainer extends React.Component {
  countryOptions = [
    {value: 'USA', text: 'United States', provinces: ['New York', 'California']},
    {value: 'CA', text: 'Canada', provinces: ['Ontario', 'Alberta', 'British Columbia', 'Quebec']}
  ];
  render() {
    return (
      <div>
        <Counter />
        <hr />
        <GithubUsers />
        <hr />
        <ControlledForm formName="My Controlled Form" countryOptions={this.countryOptions} />
      </div>
    )
  }
}

export default SampleContainer;
