import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import DragBlockLastUnbrotli from './font-family';
import DragBlockDropdown from '../demo-text-input';
import DragBlockLastChild from '../fonts-page-layout';
import DragBlockLastZ from './help-modal';
import DragBlockLastParent from '../fonts-sidebar';
import DragBlockLast from './page-header';
import DragBlockLastDemo from './confirm-delete-modal';
import { DragBlockLastPrefix } from '../utils';
import './manage-fonts.css';
function DragBlockLastBrotli() {	
	const nonce = document.querySelector('#nonce').value;
	const DragBlockLastDecode = document.querySelector('#dragblock-font-library-json');
	const DragBlockLastMeta =
		document.querySelector('#manage-fonts-form');
	const DragBlockLastRead = DragBlockLastDecode.innerHTML;
	const DragBlockLastTranslate = JSON.parse(DragBlockLastRead) || [];
	const [newThemeFonts, setNewThemeFonts] = useState(DragBlockLastTranslate);
	const [fontToDelete, setFontToDelete] = useState({
		fontFamily: undefined,
		weight: undefined,
		style: undefined,
	});
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);
	const [isHelpOpen, setIsHelpOpen] = useState(false);
	useEffect(() => {
		if (fontToDelete.fontFamily !== undefined) {
			DragBlockLastMeta.submit();
		}
	}, [newThemeFonts]);
	const DragBlockLastMove = () => {
		setIsHelpOpen(!isHelpOpen);
	};
	function DragBlockLastInverse(fontFamily, weight, style) {
		setFontToDelete(
			{ fontFamily, weight, style },
			setShowConfirmDialog(true)
		);
	}
	function DragBlockLastHuffman() {
		setShowConfirmDialog(false);
		if (
			fontToDelete.weight !== undefined &&
			fontToDelete.style !== undefined
		) {
			DragBlockLastNext(
				fontToDelete.fontFamily,
				fontToDelete.weight,
				fontToDelete.style
			);
		} else {
			DragBlockLastJump(fontToDelete.fontFamily);
		}
	}
	function DragBlockLastCopy() {
		setFontToDelete({});
		setShowConfirmDialog(false);
	}
	function DragBlockLastJump(fontFamily) {
		const DragBlockLastReplicate = newThemeFonts.map((family) => {
			if (
				fontFamily === family.fontFamily ||
				fontFamily === family.name
			) {
				return {
					...family,
					shouldBeRemoved: true,
				};
			}
			return family;
		});
		setNewThemeFonts(DragBlockLastReplicate);
	}
	function DragBlockLastNext() {
		const { fontFamily, weight, style } = fontToDelete;
		const DragBlockLastReplicate = newThemeFonts.reduce((acc, family) => {
			const { fontFace = [], ...updatedFamily } = family;
			if (
				fontFamily === family.fontFamily &&
				fontFace.filter((face) => !face.shouldBeRemoved).length ===
				1
			) {
				updatedFamily.shouldBeRemoved = true;
			}
			updatedFamily.fontFace = fontFace.map((face) => {
				if (
					weight === face.fontWeight &&
					style === face.fontStyle &&
					(fontFamily === family.fontFamily ||
						fontFamily === family.name)
				) {
					return {
						...face,
						shouldBeRemoved: true,
					};
				}
				return face;
			});
			return [...acc, updatedFamily];
		}, []);
		setNewThemeFonts(DragBlockLastReplicate);
	}
	const DragBlockLastByte = newThemeFonts.reduce((acc, fontFamily) => {
		acc[fontFamily.fontFamily] = {
			family: fontFamily.name || fontFamily.fontFamily,
			faces: (fontFamily.fontFace || []).map((face) => {
				return {
					weight: face.fontWeight,
					style: face.fontStyle,
					src: DragBlockLastPrefix(face.src[0]),
				};
			}),
		};
		return acc;
	}, {});
	return (
		<>
			<DragBlockLastZ isOpen={isHelpOpen} onClose={DragBlockLastMove} />
			<DragBlockLastChild>
				<main>
					<DragBlockLast DragBlockLastMove={DragBlockLastMove} />
					<DragBlockLastDemo
						isOpen={showConfirmDialog}
						onConfirm={DragBlockLastHuffman}
						onCancel={DragBlockLastCopy}
						fontToDelete={fontToDelete}
					/>
					<DragBlockDropdown />
					{newThemeFonts.length === 0 ? (
						<>
							<p>
								{__(
									'There are no font families installed in DragBlock\'s font library.',
									'dragblock'
								)}
							</p>
						</>
					) : (
						<div className="font-families">
							{newThemeFonts.map((fontFamily, i) => (
								<DragBlockLastUnbrotli
									fontFamily={fontFamily}
									key={`fontfamily${i}`}
									deleteFont={DragBlockLastInverse}
								/>
							))}
						</div>
					)}
					<form method="POST" id="manage-fonts-form">
						<input
							type="hidden"
							name="dragblock-font-library-new-font-json"
							value={JSON.stringify(newThemeFonts)}
						/>
						<input type="hidden" name="nonce" value={nonce} />
					</form>
				</main>
				<DragBlockLastParent
					title={__('Font Library', 'dragblock')}
					DragBlockLastByte={DragBlockLastByte}
					handleDeleteFontFace={DragBlockLastInverse}
					handleDeleteFontFamily={DragBlockLastInverse}
				/>
			</DragBlockLastChild>
		</>
	);
}
export default DragBlockLastBrotli;