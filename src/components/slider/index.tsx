import RangeSlider from 'react-bootstrap-range-slider';

const Slider = (props: any) => {
  return (
    <div>
      <div style={{ width: props?.width ?? '600px', alignSelf: 'center' }}>
        <RangeSlider
          disabled={false}
          min={props.minValue}
          max={props.maxValue}
          value={props.value}
          onChange={props.onChange}
          variant={'dark'}
          tooltip={'on'}
          size={'sm'}
          tooltipLabel={props.label}
        />
      </div>
    </div>
  );
};

export default Slider;
