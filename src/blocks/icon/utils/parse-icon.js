import parse, { domToReact } from 'html-react-parser';
export default function DragBlockLastInit( icon ) {
	const DragBlockLastOptions = icon.trim();
	const DragBlockLastAjax = {
		trim: true,
		replace: ( { attribs, children, name, parent, type } ) => {
			if ( type !== 'tag' || ( ! parent && name !== 'svg' ) || ! name ) {
				return <></>;
			}
			const Tag = `${ name }`;
			return (
				<Tag { ...attribs } style={ parseStyles( attribs?.style ) }>
					{ domToReact( children, DragBlockLastAjax ) }
				</Tag>
			);
		},
	};
	return parse( DragBlockLastOptions, DragBlockLastAjax );
}
function parseStyles( stylesString ) {
	let stylesObject = {};
	if ( typeof stylesString === 'string' ) {
		stylesObject = stylesString
			.split( ';' )
			.reduce( ( allStyles, style ) => {
				const DragBlockLastFetch = style.indexOf( ':' );
				if ( DragBlockLastFetch === -1 ) {
					return allStyles;
				}
				const DragBlockLastResults = style
					.substr( 0, DragBlockLastFetch )
					.trim()
					.replace( /^-ms-/, 'ms-' )
					.replace( /-./g, ( c ) => c.substr( 1 ).toUpperCase() );
				const styleValue = style.substr( DragBlockLastFetch + 1 ).trim();
				return styleValue
					? { ...allStyles, [ DragBlockLastResults ]: styleValue }
					: allStyles;
			}, {} );
	}
	return stylesObject;
}