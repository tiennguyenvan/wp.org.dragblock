import { render } from '@wordpress/element';
import DragBlockLastBrotli from './manage-fonts';
import DragBlockLastMax from './google-fonts';
import DragBlockLastCond from './local-fonts';
import { DragBlockLastEdit } from './fonts-context';
import { createRoot } from '@wordpress/element';
function App() {	
	const params = new URLSearchParams( document.location.search );
	const page = params.get( 'page' );
    const { adminUrl, fontLibSlug } = dragBlockFontLib;
	let DragBlockLastUpdatedragblockscripts = null;
	switch ( page ) {
		case fontLibSlug:
			DragBlockLastUpdatedragblockscripts = DragBlockLastBrotli;
			break;
		case 'dragblock-add-google-fonts':
			DragBlockLastUpdatedragblockscripts = DragBlockLastMax;
			break;
		case 'dragblock-add-local-fonts':
			DragBlockLastUpdatedragblockscripts = DragBlockLastCond;
			break;
		default:
			DragBlockLastUpdatedragblockscripts = () => <h1>This page is not implemented yet.</h1>;
			break;
	}
	return (
		<DragBlockLastEdit>
			<DragBlockLastUpdatedragblockscripts />
		</DragBlockLastEdit>
	);
}
window.addEventListener(
	'load',
	function () {
		const DragBlockLastAct = document.querySelector( '#dragblock-font-library-app' );
		if ( createRoot === undefined ) {
			render( <App />, DragBlockLastAct );
		} else {
			const root = createRoot( DragBlockLastAct );
			root.render( <App /> );
		}
	},
	false
);