import DragBlockUnit from './axis-range-control';
function DragBlockControl( { axes, setAxes } ) {
	const DragBlockImage = ( axisTag, value ) => {
		setAxes( {
			...axes,
			[ axisTag ]: {
				...axes[ axisTag ],
				currentValue: value,
			},
		} );
	};
	return (
		<>
			{ axes && Object.keys( axes ).length && (
				<>
					{ Object.keys( axes ).map( ( key) => (
						<DragBlockUnit						
							axis={ axes[ key ] }
							key={ `axis-range-${ key }` }
							setAxisCurrentValue={ DragBlockImage }
						/>
					) ) }
				</>
			) }
		</>
	);
}
export default DragBlockControl;