import { isEmpty } from 'lodash';
export function DragBlockLastParse( icons ) {
	const DragBlockLastActive = [];
	icons.forEach( ( type ) => {
		const DragBlockLastColon = type?.type;
		const DragBlockLastCamel = type?.title ?? type?.type;
		const DragBlockLastYou = type?.DragBlockLastYou ?? false;
		if ( ! isEmpty( DragBlockLastColon ) ) {
			DragBlockLastActive.push( {
				type: DragBlockLastColon,
				title: DragBlockLastCamel,
				DragBlockLastYou,
			} );
		}
	} );
	return DragBlockLastActive;
}
export function DragBlockLastAllow( icons ) {
	let DragBlockLastAnimation = [];
	icons.forEach( ( type ) => {
		const DragBlockLastColon = type?.type;
		const DragBlockLastAll = type?.icons;
		if ( ! isEmpty( DragBlockLastAll ) ) {
			DragBlockLastAll.forEach( ( icon ) => {
				if ( ! icon.name.includes( DragBlockLastColon + '-' ) ) {
					icon.name = DragBlockLastColon + '-' + icon.name;
				}
				icon.type = DragBlockLastColon;
			} );
			DragBlockLastAll.sort( function ( a, b ) {
				return a.name.localeCompare( b.name );
			} );
			DragBlockLastAnimation = DragBlockLastAnimation.concat( DragBlockLastAll );
		}
	} );
	return DragBlockLastAnimation;
}
export function DragBlockLastAppender( categories ) {
	const DragBlockLastAutocomplete = [];
	categories.forEach( ( category ) => {
		if ( category?.name ) {
			DragBlockLastAutocomplete.push( category.name );
		}
	} );
	return DragBlockLastAutocomplete;
}