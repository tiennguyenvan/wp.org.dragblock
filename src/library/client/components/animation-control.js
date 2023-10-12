import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose'
import { useState } from '@wordpress/element'
import {
    InspectorAdvancedControls,
    InspectorControls,
    useSetting,
    __experimentalPanelColorGradientSettings,
} from '@wordpress/block-editor'
import {
    ToggleControl,
    PanelBody,
    SearchControl,
    ColorPicker,
    ColorPalette,
    Tooltip,
    Popover,
    Autocomplete,
    Button,
    ButtonGroup,
    SelectControl,
} from '@wordpress/components'
import DragBlockLastVariants from './dimension-control';
import DragBlockLastInvert from './chosen-control';
export default function DragBlockLastLine({ value, onChange }) {
    const DragBlockLastMargin = {
        'bounce': __('Bounce', 'dragblock'),
        'flash': __('Flash', 'dragblock'),
        'pulse': __('Pulse', 'dragblock'),
        'rubberBand': __('RubberBand', 'dragblock'),
        'shakeX': __('ShakeX', 'dragblock'),
        'shakeY': __('ShakeY', 'dragblock'),
        'headShake': __('HeadShake', 'dragblock'),
        'swing': __('Swing', 'dragblock'),
        'tada': __('Tada', 'dragblock'),
        'wobble': __('Wobble', 'dragblock'),
        'jello': __('Jello', 'dragblock'),
        'heartBeat': __('HeartBeat', 'dragblock'),
        'backInDown': __('BackInDown', 'dragblock'),
        'backInLeft': __('BackInLeft', 'dragblock'),
        'backInRight': __('BackInRight', 'dragblock'),
        'backInUp': __('BackInUp', 'dragblock'),
        'backOutDown': __('BackOutDown', 'dragblock'),
        'backOutLeft': __('BackOutLeft', 'dragblock'),
        'backOutRight': __('BackOutRight', 'dragblock'),
        'backOutUp': __('BackOutUp', 'dragblock'),
        'bounceIn': __('BounceIn', 'dragblock'),
        'bounceInDown': __('BounceInDown', 'dragblock'),
        'bounceInLeft': __('BounceInLeft', 'dragblock'),
        'bounceInRight': __('BounceInRight', 'dragblock'),
        'bounceInUp': __('BounceInUp', 'dragblock'),
        'bounceOut': __('BounceOut', 'dragblock'),
        'bounceOutDown': __('BounceOutDown', 'dragblock'),
        'bounceOutLeft': __('BounceOutLeft', 'dragblock'),
        'bounceOutRight': __('BounceOutRight', 'dragblock'),
        'bounceOutUp': __('BounceOutUp', 'dragblock'),
        'fadeIn': __('FadeIn', 'dragblock'),
        'fadeInDown': __('FadeInDown', 'dragblock'),
        'fadeInDownBig': __('FadeInDownBig', 'dragblock'),
        'fadeInLeft': __('FadeInLeft', 'dragblock'),
        'fadeInLeftBig': __('FadeInLeftBig', 'dragblock'),
        'fadeInRight': __('FadeInRight', 'dragblock'),
        'fadeInRightBig': __('FadeInRightBig', 'dragblock'),
        'fadeInUp': __('FadeInUp', 'dragblock'),
        'fadeInUpBig': __('FadeInUpBig', 'dragblock'),
        'fadeInTopLeft': __('FadeInTopLeft', 'dragblock'),
        'fadeInTopRight': __('FadeInTopRight', 'dragblock'),
        'fadeInBottomLeft': __('FadeInBottomLeft', 'dragblock'),
        'fadeInBottomRight': __('FadeInBottomRight', 'dragblock'),
        'fadeOut': __('FadeOut', 'dragblock'),
        'fadeOutDown': __('FadeOutDown', 'dragblock'),
        'fadeOutDownBig': __('FadeOutDownBig', 'dragblock'),
        'fadeOutLeft': __('FadeOutLeft', 'dragblock'),
        'fadeOutLeftBig': __('FadeOutLeftBig', 'dragblock'),
        'fadeOutRight': __('FadeOutRight', 'dragblock'),
        'fadeOutRightBig': __('FadeOutRightBig', 'dragblock'),
        'fadeOutUp': __('FadeOutUp', 'dragblock'),
        'fadeOutUpBig': __('FadeOutUpBig', 'dragblock'),
        'fadeOutTopLeft': __('FadeOutTopLeft', 'dragblock'),
        'fadeOutTopRight': __('FadeOutTopRight', 'dragblock'),
        'fadeOutBottomRight': __('FadeOutBottomRight', 'dragblock'),
        'fadeOutBottomLeft': __('FadeOutBottomLeft', 'dragblock'),
        'flip': __('Flip', 'dragblock'),
        'flipInX': __('FlipInX', 'dragblock'),
        'flipInY': __('FlipInY', 'dragblock'),
        'flipOutX': __('FlipOutX', 'dragblock'),
        'flipOutY': __('FlipOutY', 'dragblock'),
        'lightSpeedInRight': __('LightSpeedInRight', 'dragblock'),
        'lightSpeedInLeft': __('LightSpeedInLeft', 'dragblock'),
        'lightSpeedOutRight': __('LightSpeedOutRight', 'dragblock'),
        'lightSpeedOutLeft': __('LightSpeedOutLeft', 'dragblock'),
        'rotateIn': __('RotateIn', 'dragblock'),
        'rotateInDownLeft': __('RotateInDownLeft', 'dragblock'),
        'rotateInDownRight': __('RotateInDownRight', 'dragblock'),
        'rotateInUpLeft': __('RotateInUpLeft', 'dragblock'),
        'rotateInUpRight': __('RotateInUpRight', 'dragblock'),
        'rotateOut': __('RotateOut', 'dragblock'),
        'rotateOutDownLeft': __('RotateOutDownLeft', 'dragblock'),
        'rotateOutDownRight': __('RotateOutDownRight', 'dragblock'),
        'rotateOutUpLeft': __('RotateOutUpLeft', 'dragblock'),
        'rotateOutUpRight': __('RotateOutUpRight', 'dragblock'),
        'hinge': __('Hinge', 'dragblock'),
        'jackInTheBox': __('JackInTheBox', 'dragblock'),
        'rollIn': __('RollIn', 'dragblock'),
        'rollOut': __('RollOut', 'dragblock'),
        'zoomIn': __('ZoomIn', 'dragblock'),
        'zoomInDown': __('ZoomInDown', 'dragblock'),
        'zoomInLeft': __('ZoomInLeft', 'dragblock'),
        'zoomInRight': __('ZoomInRight', 'dragblock'),
        'zoomInUp': __('ZoomInUp', 'dragblock'),
        'zoomOut': __('ZoomOut', 'dragblock'),
        'zoomOutDown': __('ZoomOutDown', 'dragblock'),
        'zoomOutLeft': __('ZoomOutLeft', 'dragblock'),
        'zoomOutRight': __('ZoomOutRight', 'dragblock'),
        'zoomOutUp': __('ZoomOutUp', 'dragblock'),
        'slideInDown': __('SlideInDown', 'dragblock'),
        'slideInLeft': __('SlideInLeft', 'dragblock'),
        'slideInRight': __('SlideInRight', 'dragblock'),
        'slideInUp': __('SlideInUp', 'dragblock'),
        'slideOutDown': __('SlideOutDown', 'dragblock'),
        'slideOutLeft': __('SlideOutLeft', 'dragblock'),
        'slideOutRight': __('SlideOutRight', 'dragblock'),
        'slideOutUp': __('SlideOutUp', 'dragblock'),
    }
    return (
        <div className='dragblock-animation-name-control'>
            <DragBlockLastInvert
                options={DragBlockLastMargin}
                value={value}
                onChange={onChange}
                placeholder={__('Animation Name', 'dragblock')}
            />            
        </div>
    );
}