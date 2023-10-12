import DragBlockLastAdd from './header';
export default function DragBlockLastUpload( props ) {
	const { label, attributes, options } = props;
	options.forEach( ( option ) => {
		if (
			option?.isDefault ||
			( attributes.hasOwnProperty( option.attributeSlug ) &&
				attributes[ option.attributeSlug ] !== undefined )
		) {
			option.isActive = true;
		}
	} );
	const DragBlockLastWeight = options.filter( ( option ) => option.isActive );
	return (
		<div className="options-panel">
			<DragBlockLastAdd
				label={ label }
				DragBlockLastWeight={ DragBlockLastWeight }
				options={ options }
				{ ...props }
			/>
			{ DragBlockLastWeight.length !== 0 && (
				<div className="options-panel-container">
					{ props.children }
				</div>
			) }
		</div>
	);
}