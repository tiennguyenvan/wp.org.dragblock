import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks'
export default function save(props) {		
	const {attributes} = props;	
	const {dragBlockTagName} = attributes;	
	let blockProps = useBlockProps.save();
	const markup = (
		<>
			{(dragBlockTagName === 'div' || !dragBlockTagName) && (
				<div {...blockProps}>
					<InnerBlocks.Content/>
				</div>
			)}
			{(dragBlockTagName === 'section') && (<section {...blockProps}><InnerBlocks.Content/></section>)}
			{(dragBlockTagName === 'header') && (<header {...blockProps}><InnerBlocks.Content/></header>)}
			{(dragBlockTagName === 'footer') && (<footer {...blockProps}><InnerBlocks.Content/></footer>)}
			{(dragBlockTagName === 'main') && (<main {...blockProps}><InnerBlocks.Content/></main>)}
			{(dragBlockTagName === 'article') && (<article {...blockProps}><InnerBlocks.Content/></article>)}
			{(dragBlockTagName === 'aside') && (<aside {...blockProps}><InnerBlocks.Content/></aside>)}
			{(dragBlockTagName === 'nav') && (<nav {...blockProps}><InnerBlocks.Content/></nav>)}
			{(dragBlockTagName === 'button') && (<button {...blockProps}><InnerBlocks.Content/></button>)}
			{(dragBlockTagName === 'ul') && (<ul {...blockProps}><InnerBlocks.Content/></ul>)}
			{(dragBlockTagName === 'li') && (<li {...blockProps}><InnerBlocks.Content/></li>)}
			{(dragBlockTagName === 'blockquote') && (<blockquote {...blockProps}><InnerBlocks.Content/></blockquote>)}
			{(dragBlockTagName === 'pre') && (<pre {...blockProps}><InnerBlocks.Content/></pre>)}
			{(dragBlockTagName === 'h1') && (<h1 {...blockProps}><InnerBlocks.Content/></h1>)}
			{(dragBlockTagName === 'h2') && (<h2 {...blockProps}><InnerBlocks.Content/></h2>)}
			{(dragBlockTagName === 'h3') && (<h3 {...blockProps}><InnerBlocks.Content/></h3>)}
			{(dragBlockTagName === 'h4') && (<h4 {...blockProps}><InnerBlocks.Content/></h4>)}
			{(dragBlockTagName === 'h5') && (<h5 {...blockProps}><InnerBlocks.Content/></h5>)}
			{(dragBlockTagName === 'h6') && (<h6 {...blockProps}><InnerBlocks.Content/></h6>)} 
			{(dragBlockTagName === 'label') && (<label {...blockProps}><InnerBlocks.Content/></label>)} 
			{(dragBlockTagName === 'fieldset') && (<fieldset {...blockProps}><InnerBlocks.Content/></fieldset>)} 
			{(dragBlockTagName === 'legend') && (<legend {...blockProps}><InnerBlocks.Content/></legend>)} 
		</>
	)
	return (
		<>
			{markup}
		</>
	);
}