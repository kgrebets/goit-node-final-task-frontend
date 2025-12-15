import React from 'react';
import Select from '../../components/ui/select.jsx';
import Checkbox from '../../components/ui/checkbox.jsx';
import InputAdvanced from '../../components/ui/input-advanced.jsx';
import TextareaAdvanced from '../../components/ui/textarea-advanced.jsx';

const optionsExample = [
  {
    label: 'Option 1',
    value: 'option_1',
    disabled: false,
  },
  {
    label: 'Option 2',
    value: 'option_2',
    disabled: false,
  },
  {
    label: 'Option 3',
    value: 'option_3',
    disabled: false,
  },
  {
    label: 'Option 4',
    value: 'option_4',
    disabled: true,
  },
];
const StyleGuide = () => {
  return (
    <div className="px-4">
      <p>Style Guide</p>

      <h1>Heading</h1>
      <h2>Heading</h2>
      <h3>Heading</h3>
      <h4>Heading</h4>
      <h5>Heading</h5>
      <h6>Heading</h6>

      <div className="flex items-start gap-4 mt-4">
        <button>Button Disabled</button>

        <button className="btn-primary">Button Primary</button>

        <button className="btn-secondary">Button Secondary</button>
      </div>

      <h2>Form Elements</h2>
      <div className="forms flex flex-col items-start gap-4 mt-4">
        <input type="text" value="Test" />

        <label htmlFor="pl">
          <span>Test label</span>
          <input type="text" id="pl" placeholder="Placeholder goes here" />
        </label>

        <InputAdvanced placeholder="Enter a description of the dish"  mainWrapperClasses="w-md"/>

        <InputAdvanced placeholder="Enter a description of the dish"  mainWrapperClasses="w-lg" showMinMaxChars={true} maxChars={1000}/>

        <TextareaAdvanced placeholder="Enter a description of the dish textarea"  mainWrapperClasses="w-lg" showMinMaxChars={true} maxChars={1000}/>

        <Select
          options={optionsExample}
          optionPlaceholderText="Add the ingredient"
          wrapperClassName="max-w-max"
        />
        <Checkbox label="Test label" id="test" name="name" />
      </div>
    </div>
  );
};

export default StyleGuide;
