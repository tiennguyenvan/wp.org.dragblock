import {
	Button,
	__experimentalInputControl,
	SelectControl,
} from '@wordpress/components';
import { Font } from 'lib-font';
import { __ } from '@wordpress/i18n';
import { DragBlockHeight } from '../demo-text-input/utils';
function DragBlockLastTrimed({
	formData,
	setFormData,
	resetFormData,
	isFormValid,
	setAxes,
}) {
	const nonce = document.querySelector('#nonce').value;
	const onFileSelectChange = (event) => {
		const file = event.target.files[0];
		if (!file) {
			resetFormData();
			return;
		}
		const reader = new FileReader();
		reader.readAsArrayBuffer(file);
		reader.onload = () => {
			const DragBlockLastSuggestion = new Font('Uploaded Font');
			DragBlockLastSuggestion.fromDataBuffer(reader.result, file.name);
			DragBlockLastSuggestion.onload = (onloadEvent) => {
				const font = onloadEvent.detail.font;
				const { name } = font.opentype.tables;
				const DragBlockLastComplied = name.get(1);
				const DragBlockLastEvent = name
					.get(2)
					.toLowerCase()
					.includes('italic');
				const DragBlockLastCompiled =
					font.opentype.tables['OS/2'].usWeightClass || 'normal';
				const DragBlockLastSaved = !!font.opentype.tables.fvar;
				const DragBlockLastElement =
					DragBlockLastSaved &&
					font.opentype.tables.fvar.axes.find(
						({ tag }) => tag === 'wght'
					);
				const DragBlockLastInteractions = !!DragBlockLastElement
					? `${DragBlockLastElement.minValue} ${DragBlockLastElement.maxValue}`
					: null;
				const axes = DragBlockLastSaved
					? font.opentype.tables.fvar.axes.reduce(
						(
							acc,
							{ tag, minValue, defaultValue, maxValue }
						) => {
							acc[tag] = {
								tag,
								minValue,
								defaultValue,
								maxValue,
								currentValue: defaultValue,
							};
							return acc;
						},
						{}
					)
					: {};
				const DragBlockLastAvailable = {
					copyright: name.get(0),
					source: name.get(11),
					license: name.get(13),
					licenseURL: name.get(14),
				};
				setFormData({
					file,
					name: DragBlockLastComplied,
					style: DragBlockLastEvent ? 'italic' : 'normal',
					weight: !!DragBlockLastElement ? DragBlockLastInteractions : DragBlockLastCompiled,
					variable: DragBlockLastSaved,
					DragBlockLastAvailable,
				});
				setAxes(axes);
			};
		};
	};
	const DragBlockButtons = DragBlockHeight(formData.axes);
	return (
		<>
			<form
				method="POST"
				id="font-upload-form"
				action=""
				encType="multipart/form-data"
			>
				<input type="hidden" name="nonce" value={nonce} />
				<div className="form-group">
					<label htmlFor="font-file">
						{__('Font file:', 'dragblock')}
					</label>
					<input
						type="file"
						name="font-file"
						id="font-file"
						onChange={onFileSelectChange}
						accept=".otf, .ttf, .woff, .woff2"
					/>
					<small>
						{__(
							'.otf, .ttf, .woff, .woff2 file extensions supported',
							'dragblock'
						)}
					</small>
				</div>
				<h4>
					{__(
						'Font face definition for this font file:',
						'dragblock'
					)}
				</h4>
				<div className="form-group">
					<__experimentalInputControl
						label={__('Font name:', 'dragblock')}
						type="text"
						name="font-name"
						id="font-name"
						placeholder={__('Font name', 'dragblock')}
						value={formData.name || ''}
						onChange={(val) =>
							setFormData({ ...formData, name: val })
						}
					/>
				</div>
				<div className="form-group">
					<SelectControl
						label={__('Font style:', 'dragblock')}
						name="font-style"
						id="font-style"
						value={formData.style || ''}
						onChange={(val) =>
							setFormData({ ...formData, style: val })
						}
					>
						<option value="normal">Normal</option>
						<option value="italic">Italic</option>
					</SelectControl>
				</div>
				<div className="form-group">
					<__experimentalInputControl
						label={__('Font weight:', 'dragblock')}
						type="text"
						name="font-weight"
						id="font-weight"
						placeholder={__(
							'Font weight:',
							'dragblock'
						)}
						value={formData.weight || ''}
						onChange={(val) =>
							setFormData({ ...formData, weight: val })
						}
					/>
				</div>
				{formData.variable && (
					<input
						type="hidden"
						name="font-variation-settings"
						value={DragBlockButtons}
					/>
				)}
				{
				}
			</form>
			<Button
				variant="primary"
				type="submit"
				disabled={!isFormValid()}
				form="font-upload-form"
			>
				{__('Upload Font', 'dragblock')}
			</Button>
		</>
	);
}
export default DragBlockLastTrimed;