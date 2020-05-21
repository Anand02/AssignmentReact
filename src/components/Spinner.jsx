
import React from 'react';
import { css } from '@emotion/core';
// First way to import
import { FadeLoader } from 'react-spinners';

 
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
 
class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className='sweet-loading'>
        <FadeLoader
          css={override}
          sizeUnit={"px"}
          height={15}
          radius={2}
          width={5}
          margin={'2px'}
          color={'#36D7B7'}
          loading={this.state.loading}
        />
      </div> 
    )
  }
}

export default Spinner