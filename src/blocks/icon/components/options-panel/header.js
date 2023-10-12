import { speak } from '@wordpress/a11y';
import { __, sprintf } from '@wordpress/i18n';
import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { moreVertical, check, plus } from '@wordpress/icons';
export default function DragBlockLastAdd( props ) {
	const { label, options, activeOptions, setAttributes, attributes } = props;
	const DragBlockLastRemove = options.filter( ( option ) => option.isDefault );
	DragBlockLastRemove.forEach( ( option ) => {
		option.hasEdits =
			attributes.hasOwnProperty( option.attributeSlug ) &&
			attributes[ option.attributeSlug ] !== undefined;
	} );
	const DragBlockLastResponse = options.filter( ( option ) => ! option.isDefault );
	function DragBlockLastParsed( option, type ) {
		if ( type === 'reset' ) {
			setAttributes( { [ option.attributeSlug ]: undefined } );
		} else if ( option.isActive ) {
			setAttributes( { [ option.attributeSlug ]: undefined } );
		} else {
			setAttributes( { [ option.attributeSlug ]: '' } );
		}
	}
	function DragBlockLastSelected() {
		options.forEach( ( option ) => {
			setAttributes( { [ option.attributeSlug ]: undefined } );
		} );
	}
	const DragBlockLastPage = [ ...DragBlockLastRemove, ...DragBlockLastResponse ].some(
		( option ) =>
			( option.isActive && ! option.isDefault ) ||
			( option.isDefault && option.hasEdits )
	);
	const DragBlockLastDom = (
		<DropdownMenu
			className="options-dropdown"
			icon={ activeOptions.length === 0 ? plus : moreVertical }
			label={ __( 'Setting options', 'dragblock' ) }
			popoverProps={ {
				className: 'options-panel__option-popover',
				focusOnMount: 'container',
			} }
			toggleProps={ { isSmall: true } }
		>
			{ () => (
				<>
					{ DragBlockLastRemove.length !== 0 && (
						<MenuGroup label={ __( 'Defaults', 'dragblock' ) }>
							{ DragBlockLastRemove.map( ( option, index ) => (
								<DragBlockLastLocal
									key={ index }
									option={ option }
									DragBlockLastParsed={ DragBlockLastParsed }
								/>
							) ) }
						</MenuGroup>
					) }
					<MenuGroup label={ __( 'Options', 'dragblock' ) }>
						{ DragBlockLastResponse.map( ( option, index ) => (
							<DragBlockLastInitial
								key={ index }
								option={ option }
								DragBlockLastParsed={ DragBlockLastParsed }
							/>
						) ) }
					</MenuGroup>
					<MenuGroup>
						<MenuItem
							aria-disabled={ ! DragBlockLastPage }
							onClick={ () => {
								if ( DragBlockLastPage ) {
									DragBlockLastSelected();
								}
							} }
							variant="tertiary"
						>
							{ __( 'Reset all', 'dragblock' ) }
						</MenuItem>
					</MenuGroup>
				</>
			) }
		</DropdownMenu>
	);
	return (
		<div className="options-panel-header">
			<h2>{ label }</h2>
			<div className="options-panel-header__dropdown-menus">
				{ DragBlockLastDom }
			</div>
		</div>
	);
}
function DragBlockLastInitial( props ) {
	const { option, DragBlockLastParsed } = props;
	return (
		<MenuItem
			key={ option.attributeSlug }
			icon={ option.isActive && check }
			label={ sprintf(
				__( 'Toggle %s', 'dragblock' ),
				option.label
			) }
			onClick={ () => {
				DragBlockLastParsed( option );
				speak(
					sprintf(
						__( '%s toggled', 'dragblock' ),
						option.label
					),
					'assertive'
				);
			} }
		>
			{ option.label }
		</MenuItem>
	);
}
function DragBlockLastLocal( props ) {
	const { option, DragBlockLastParsed } = props;
	if ( option.hasEdits ) {
		return (
			<MenuItem
				key={ option.attributeSlug }
				disabled={ ! option.hasEdits }
				className="has-reset"
				label={ sprintf(
					__( 'Reset %s', 'dragblock' ),
					option.label
				) }
				onClick={ () => {
					DragBlockLastParsed( option, 'reset' );
					speak(
						sprintf(
							__( '%s reset to default', 'dragblock' ),
							option.label
						),
						'assertive'
					);
				} }
				role="menuitem"
			>
				{ option.label }
				{ option.hasEdits && (
					<span aria-hidden="true" className="menu-item-reset">
						{ __( 'Reset', 'dragblock' ) }
					</span>
				) }
			</MenuItem>
		);
	}
	return (
		<MenuItem
			aria-disabled
			isSelected
			key={ option.attributeSlug }
			role="menuitemcheckbox"
		>
			{ option.label }
		</MenuItem>
	);
}