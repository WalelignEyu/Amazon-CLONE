import React from 'react'
import CarouselEffect from "../../components/Carousel/Carousel";
import Catagory from '../../components/Catagory/Catagory';
import Product from '../../components/Products/Product';
import LayOut from '../../components/LayOut/LayOut';
import BackFooter from '../../components/Footer/BackFooter';
import ClosingFooter from '../../components/Footer/ClosingFooter'
import MainFooter from '../../components/Footer/MainFooter';
import {footerSections} from "../../components/Footer/FooterData";
import LastFooter from '../../components/Footer/LastFooter';
import {footerItems} from "../../components/Footer/Fdata"; // Corrected import

function Landing() {
  return (
		<>
			<LayOut>
				<CarouselEffect />
				<Catagory />
				<Product />
				<BackFooter />
				<MainFooter sections={footerSections} />
				<ClosingFooter />
				<LastFooter items={footerItems} />
			</LayOut>
		</>
	);
}

export default Landing
