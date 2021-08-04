import React from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';
import './collection-item.styles.scss';
import CustomButton from '../custom-buttom/custom-buttom.component';

const CollectionItem = ({item, addItem }) => {
    const { name, price, imageUrl} = item;
    return(
        <div className="collection-item">
            <div  className='image'style={{ backgroundImage: `url(${imageUrl})`}}>
            </div>
            <div className='collection-footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <CustomButton onClick={() => addItem(item)} inverted>Add to cart</CustomButton>
        </div>
    );
}

//means when addItem function is called it will add item as a props and dispatch the item via addItem action
const mapDispatchToProps = dispatch =>({
    addItem : item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);