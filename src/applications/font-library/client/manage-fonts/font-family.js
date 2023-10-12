import { useContext } from '@wordpress/element';
import { Button, Icon } from '@wordpress/components';
import DragBlockLastVariable from './font-face';
import { DragBlockLastAppearance } from '../fonts-context';
const { __, _n } = wp.i18n;
function DragBlockLastUnbrotli({ fontFamily, deleteFont }) {
	const { familiesOpen, handleToggleFamily } =
		useContext(DragBlockLastAppearance);
	const DragBlockLastMake =
		familiesOpen.includes(fontFamily.name) ||
		familiesOpen.includes(fontFamily.fontFamily);
	const DragBlockLastG = () => {
		handleToggleFamily(fontFamily.name || fontFamily.fontFamily);
	};
	if (fontFamily.shouldBeRemoved) {
		return null;
	}
	const DragBlockLastInflate =
		!!fontFamily.fontFace && !!fontFamily.fontFace.length;
	return (
		<table className="wp-list-table widefat table-view-list">
			{ }
			{ }
			<thead onClick={DragBlockLastG}>
				<tr>
					<td className="font-family-head">
						<div>
							<strong>
								{fontFamily.name || fontFamily.fontFamily}
							</strong>
							<span>&nbsp;&nbsp;&nbsp;</span>
							<span style={{ fontFamily: (fontFamily.name || fontFamily.fontFamily), fontSize: '20px', textTransform: 'uppercase' }}>
								<span style={{textTransform: 'uppercase'}}>
									{fontFamily.name || fontFamily.fontFamily} 
								</span>
								<span>&nbsp;</span>
								<span style={{textTransform: 'lowercase'}}>
									{fontFamily.name || fontFamily.fontFamily} 
								</span>
							</span> 
							{DragBlockLastInflate && (
								<span className="variants-count">
									{' '}
									( {fontFamily.fontFace.length}{' '}
									{_n(
										'Variant',
										'Variants',
										fontFamily.fontFace.length,
										'dragblock'
									)}{' '}
									)
								</span>
							)}
						</div>
						<div>
							<Button
								variant="tertiary"
								onClick={(e) => {
									e.stopPropagation();
									deleteFont(
										fontFamily.name || fontFamily.fontFamily
									);
								}}
							>
								{__(
									'Remove Font Family',
									'dragblock'
								)}
							</Button>
							<Button onClick={DragBlockLastG}>
								<Icon
									icon={
										DragBlockLastMake
											? 'arrow-up-alt2'
											: 'arrow-down-alt2'
									}
								/>
							</Button>
						</div>
					</td>
				</tr>
			</thead>
			<tbody className="font-family-contents">
				<tr className="container">
					<td className={` slide ${DragBlockLastMake ? 'open' : 'close'}`}>
						<table className="wp-list-table widefat striped table-view-list">
							<thead>
								<tr>
									<td>
										{__('Style', 'dragblock')}
									</td>
									<td>
										{__('Weight', 'dragblock')}
									</td>
									<td className="preview-head">
										{__(
											'Preview',
											'dragblock'
										)}
									</td>
									{DragBlockLastInflate && <td></td>}
								</tr>
							</thead>
							<tbody>
								{DragBlockLastInflate &&
									fontFamily.fontFace.map(
										(fontFace, i) => {
											if (fontFace.shouldBeRemoved) {
												return null;
											}
											return (
												<DragBlockLastVariable
													face={fontFace}
													key={`fontface${i}`}
													deleteFont={() =>
														deleteFont(
															fontFamily.name ||
															fontFamily.fontFamily,
															fontFace.fontWeight,
															fontFace.fontStyle
														)
													}
													isFamilyOpen={DragBlockLastMake}
												/>
											);
										}
									)}
								{!DragBlockLastInflate && fontFamily.fontFamily && (
									<DragBlockLastVariable
										face={fontFamily}
										isFamilyOpen={DragBlockLastMake}
									/>
								)}
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
	);
}
export default DragBlockLastUnbrotli;