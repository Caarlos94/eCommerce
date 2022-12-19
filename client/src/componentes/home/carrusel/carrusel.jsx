import React, { Component } from 'react';
import style from './carrusel.module.css'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const items = [
  {
    src: 'https://sporting.vtexassets.com/arquivos/ids/246066-800-800?v=637496895161670000&width=800&height=800&aspect=true',
  },
  {
    src: 'https://static.dafiti.com.br/p/adidas-Originals-Camiseta-adidas-Originals-3-Stripes-Vermelha/Branca-2199-7958325-1-zoom.jpg',
  },
  {
    src: 'https://sportotalar.vteximg.com.br/arquivos/ids/270373-400-400/GN5773-1074-Blanco_1.jpg?v=637617810373430000',
  },
  {
    src: 'https://static.dafiti.com.ar/p/nike-2456-370762-1-product.jpg',
  },
  {
    src: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/d3b276d3-aec0-4d7b-911c-bd7ee42a3e7f/shorts-pro-flex-vent-max-PjJ4sM.png',
  }
];

class Carrusell extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} className={style.img} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
       
      );
    });

    return (
      <div className={style.next} >
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous}  className={style.prev}/>
       
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        
      </Carousel>
      </div>
    );
  }
}


export default Carrusell;

