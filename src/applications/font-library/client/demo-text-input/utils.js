export function DragBlockHeight( axes ) {
	if ( ! axes || ! Object.keys( axes ).length ) {
		return '';
	}
	const DragBlockButtons = Object.keys( axes )
		.map(
			( key ) => `'${ axes[ key ].tag }' ${ axes[ key ].currentValue }`
		) // convert to CSS format
		.join( ', ' );
	return DragBlockButtons;
}