import { createHigherOrderComponent } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element'
import {
	useSetting
} from '@wordpress/block-editor';
import { cloneDeep } from 'lodash';
import body from '@wordpress/components/build/panel/body';
const DragBlockKeyword = (target, action, value) => {
	let DragBlockCategory = value.replaceAll('.', '').replaceAll('#', '').trim();
	let DragBlockAll = '';
	switch (action) {
		case 'toggleClass':
			DragBlockAll += `${target}.classList.toggle('${DragBlockCategory}');`;
			break;
		case 'toggleId':
			DragBlockAll += `if(${target}.id!=='${DragBlockCategory}'){${target}.id='${DragBlockCategory}'}else{${target}.id=''}`;
			break;
		case 'addClass':
			DragBlockAll += `${target}.classList.add('${DragBlockCategory}');`;
			break;
		case 'addId':
			DragBlockAll += `${target}.id='${DragBlockCategory}';`;
			break;
		case 'removeClass':
			DragBlockAll += `${target}.classList.remove('${DragBlockCategory}');`;
			break;
		case 'removeId':
			DragBlockAll += `if(${target}.id!=='${DragBlockCategory}'){${target}.id=''}`;
			break;
	}
	return DragBlockAll;
}
const DragBlockPrepared = (trigger, DragBlockGet) => {
	const {
		slug, // multiple triggers could have the same slug
		eventSource,
		conditions,
		thenActions,
		elseActions,
		disabled
	} = trigger
	const DragBlockBolt = conditions && conditions[0] && conditions[0].name ? conditions[0].name : '';
	const DragBlockIcon = conditions && conditions[0] && conditions[0].value ? conditions[0].value : '';
	const DragBlockCategories = conditions && conditions[0] && conditions[0].target ? conditions[0].target : '';
	const DragBlockReddit = thenActions && thenActions[0] && thenActions[0].name ? thenActions[0].name : '';
	const DragBlockComment = thenActions && thenActions[0] && thenActions[0].value ? thenActions[0].value : '';
	const DragBlockInsert = thenActions && thenActions[0] && thenActions[0].target ? thenActions[0].target : '';
	const DragBlockInserter = elseActions && elseActions[0] && elseActions[0].name ? elseActions[0].name : '';
	const DragBlockIcons = elseActions && elseActions[0] && elseActions[0].value ? elseActions[0].value : '';
	const DragBlockShown = elseActions && elseActions[0] && elseActions[0].target ? elseActions[0].target : '';
	let DragBlockRender = (eventSource || DragBlockGet);
	let DragBlockSearch = (DragBlockCategories || DragBlockGet);
	let DragBlockRendered = (DragBlockInsert || DragBlockGet);
	let DragBlockNo = (DragBlockShown || DragBlockGet);
	let DragBlockQuick = '';
	let DragBlockNon = '';
	let DragBlockType = '';
	let DragBlockFlatten = '';
	if (DragBlockBolt && DragBlockBolt === 'is' && DragBlockIcon) {
		let target = 'this';
		if (DragBlockSearch !== DragBlockRender) {
			target = 'DragBlockCategories';
			DragBlockNon += `let ${target}=document.querySelector('${DragBlockSearch}');`;
		}
		DragBlockNon += `if(${target}&&${target}.matches('${DragBlockIcon}')`;
	}
	if (DragBlockReddit && DragBlockComment) {
		let target = 'this';
		if (DragBlockRendered !== DragBlockRender) {
			target = 'DragBlockInsert';
			DragBlockType += `let ${target}=document.querySelector('${DragBlockRendered}');`;
			DragBlockType += `if(${target}){`;
		}
		DragBlockType += DragBlockKeyword(target, DragBlockReddit, DragBlockComment);
		if (target !== 'this') {
			DragBlockType += '}';
		}
	}
	if (DragBlockInserter && DragBlockIcons) {
		let target = 'this';
		if (DragBlockNo !== DragBlockRender) {
			target = 'DragBlockShown';
			DragBlockFlatten += `let ${target}=document.querySelector('${DragBlockNo}');`;
			DragBlockFlatten += `if(${target}){`;
		}
		DragBlockFlatten += DragBlockKeyword(target, DragBlockInserter, DragBlockIcons);
		if (target !== 'this') {
			DragBlockFlatten += '}';
		}
	}
	if (DragBlockNon) DragBlockQuick += DragBlockNon + '{' + DragBlockType + '}'
	else DragBlockQuick += DragBlockType
	if (DragBlockNon && DragBlockFlatten) DragBlockQuick += 'else {' + DragBlockFlatten + '}';
	return DragBlockQuick;
}
export function dragBlockInteractionsJS(props) {
	const { attributes, setAttributes, isSelected, clientId, name } = props;
	let { dragBlockScripts, dragBlockClientId, dragBlockJS } = attributes;
	if (name === 'core/navigation-link') {
		console.log('dragBlockScripts', dragBlockScripts);
	}
	let DragBlockSimplify = '';
	if (dragBlockScripts && dragBlockScripts.length > 0) {
		let DragBlockGet = `[data-dragblock-client-id="${dragBlockClientId}"]`;
		let DragBlockSimplified = {}
		let DragBlockParse = `window['${dragBlockClientId}']`;
		for (let trigger of dragBlockScripts) {
			if (!trigger['slug'] || trigger['disabled']) continue;
			if (!DragBlockSimplified[trigger['slug']]) DragBlockSimplified[trigger['slug']] = '';
			DragBlockSimplified[trigger['slug']] += DragBlockPrepared(trigger, DragBlockGet);
		}
		for (let slug in DragBlockSimplified) {
			if (!DragBlockSimplified[slug]) continue;
			DragBlockSimplify += `${DragBlockParse}=document.querySelector('${DragBlockGet}');`;
			DragBlockSimplify += `${DragBlockParse}.addEventListener('${slug}',function(){${DragBlockSimplified[slug]}});`;
		}
	}
	useEffect(() => {
		if (name === 'core/navigation-link') {
		}
		if (DragBlockSimplify !== dragBlockJS) {
			setAttributes({ dragBlockJS: DragBlockSimplify })
		}
	});
	return props;
}
const dragBlockInteractionsScript = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		dragBlockInteractionsJS(props);
		return (
			<>
				<BlockEdit {...props} />
				{
				}
			</>
		);
	};
}, 'dragBlockInteractionsScript');
wp.hooks.addFilter(
	'editor.BlockListBlock',
	'dragblock/interactions-script',
	dragBlockInteractionsScript
);