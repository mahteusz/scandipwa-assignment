import OfflineNotice from '@scandipwa/scandipwa/src/component/OfflineNotice';
import ProgressBar from 'Component/ProgressBar/ProgressBar.component';
import { Header as SourceHeader } from 'SourceComponent/Header/Header.component';

import {
    CART_OVERLAY,
    CUSTOMER_WISHLIST,
} from './Header.config';

export const STEPS = ['shipping', 'billing', 'success']


/** @namespace ScandipwaAssignment/Component/Header/Component */
export class HeaderComponent extends SourceHeader {

    render() {
        const { stateMap } = this;
        const {
            navigationState: { name, isHiddenOnMobile = false },
            isCheckout,
            device
        } = this.props;

        if (!device.isMobile) {
            // hide edit button on desktop
            stateMap[CUSTOMER_WISHLIST].edit = false;
            stateMap[CUSTOMER_WISHLIST].share = false;
            stateMap[CART_OVERLAY].edit = false;
        }

        return (
            <section block="Header" elem="Wrapper">
                <header
                  block="Header"
                  mods={ { name, isHiddenOnMobile, isCheckout } }
                  mix={ { block: 'FixedElement', elem: 'Top' } }
                  ref={ this.logoRef }
                >
                    { this.renderTopMenu() }
                    <nav block="Header" elem="Nav">
                        { this.renderNavigationState() }
                    </nav>
                    { this.renderMenu() }
                    {
                        this.props.isCheckout &&
                        <ProgressBar steps={STEPS}/>
                    }                    
                </header>
                <OfflineNotice />
            </section>
        );
    }
}

export default HeaderComponent;