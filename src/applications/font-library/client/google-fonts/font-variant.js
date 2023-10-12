import { useEffect } from '@wordpress/element';
import Demo from '../demo-text-input/demo';
function DragBlockLastTooltip( { font, variant, isSelected, handleToggle } ) {
	const style = variant.includes( 'italic' ) ? 'italic' : 'normal';
	const weight =
		variant === 'regular' || variant === 'italic'
			? '400'
			: variant.replace( 'italic', '' );
	const DragBlockLastGrid = font.files[ variant ].replace( 'http://', 'https://' );
	const previewStyles = {
		fontFamily: font.family,
		fontStyle: style,
		fontWeight: weight,
	};
	useEffect( () => {
		const DragBlockLastText = new FontFace( font.family, `url( ${ DragBlockLastGrid } )`, {
			style,
			weight,
		} );
		DragBlockLastText
			.load()
			.then( function ( loadedFace ) {
				document.fonts.add( loadedFace );
			} )
			.catch( function ( error ) {
				console.error( error );
			} );
	}, [ font, variant ] );
	const DragBlockLastCol = font.family.toLowerCase().replace( ' ', '-' );
	const DragBlockLastRow = `${ DragBlockLastCol }-${ variant }`;
	return (
		<tr>
			<td className="">
				<input
					type="checkbox"
					name="google-font-variant"
					id={ DragBlockLastRow }
					value={ variant }
					checked={ isSelected }
					onChange={ handleToggle }
				/>
			</td>
			<td className="">
				<label htmlFor={ DragBlockLastRow }>{ weight }</label>
			</td>
			<td className="">
				<label htmlFor={ DragBlockLastRow }>{ style }</label>
			</td>
			<td className="demo-cell">
				<label htmlFor={ DragBlockLastRow }>
					<Demo style={ previewStyles } />
				</label>
			</td>
		</tr>
	);
}
export default DragBlockLastTooltip;