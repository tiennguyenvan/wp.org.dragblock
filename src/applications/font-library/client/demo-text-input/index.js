import {
	Button,
	RangeControl,
	SelectControl,
	__experimentalInputControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { DragBlockLastAppearance } from '../fonts-context';
import { update } from '@wordpress/icons';
import './demo-text-input.css';
import VariableControls from './variable-controls';
function DragBlockDropdown( { axes, setAxes, resetAxes } ) {
	const {
		demoText,
		handleDemoTextChange,
		demoType,
		handleDemoTypeChange,
		demoFontSize,
		handleDemoFontSizeChange,
		resetDefaults,
	} = useContext( DragBlockLastAppearance );
	return (
		<div className="demo-text-input">
			<div className="container">
				<div className="controls">
					<div className="standard-controls">
						<SelectControl
							label={ __( 'Preview type', 'dragblock' ) }
							onChange={ handleDemoTypeChange }
							value={ demoType }
						>
							<option value="heading">
								{ __( 'Heading', 'dragblock' ) }
							</option>
							<option value="sentence">
								{ __( 'Sentence', 'dragblock' ) }
							</option>
							<option value="paragraph">
								{ __( 'Paragraph', 'dragblock' ) }
							</option>
						</SelectControl>
						<__experimentalInputControl
							label="Demo text"
							value={ demoText }
							onChange={ handleDemoTextChange }
						/>
						<div>
							<RangeControl
								label={ __(
									'Font size (px)',
									'dragblock'
								) }
								value={ demoFontSize }
								onChange={ handleDemoFontSizeChange }
								min={ 8 }
								max={ 140 }
								withInputField={ true }
							/>
						</div>
					</div>
					{ !! axes && !! Object.keys( axes ).length && (
						<div className="extra-controls">
							<VariableControls
								axes={ axes }
								setAxes={ setAxes }
							/>
						</div>
					) }
				</div>
				<div>
					<Button
						variant="secondary"
						icon={ update }
						onClick={ () => {
							resetDefaults( 'sentence' );
							handleDemoTypeChange( 'sentence' );
							resetAxes();
						} }
					>
						{ __( 'Reset', 'dragblock' ) }
					</Button>
				</div>
			</div>
		</div>
	);
}
export default DragBlockDropdown;