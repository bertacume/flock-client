import React, { Component } from 'react';
import { ContainerMode, Button, pressed } from '../styledComponents/styledComponents';

export class WizardMode extends Component {
  handleClick = (type) => {
    const flag = this.props.mode;
    if (type === 'dictator' && flag) return;
    if (type === 'democracy' && !flag) return;
    this.props.setMode(!flag);
  }

  render() {
    return (
      <ContainerMode>
        <Button className={this.props.mode ? null : pressed} onClick={() => this.handleClick('democracy')}>Democracy</Button>
        <Button className={this.props.mode ? pressed : null} onClick={() => this.handleClick('dictator')}>Dictator</Button>
      </ContainerMode>
    );
  }
}

