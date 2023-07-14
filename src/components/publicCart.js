import React, {useState, useEffect} from 'react'
import {DeletePublicItem, UpdatePublicItem, PublicSum} from './index'

const PublicCart = ({isLoggedIn, guestCart, setGuestCart}) => {


    useEffect(() => {
        if (!isLoggedIn) {
          console.log("start");
          let prevItem = JSON.parse(localStorage.getItem("cart"));
          console.log(prevItem, "item");
          setGuestCart(prevItem);
        }
      }, []);

      const notUserCart = guestCart.map((cartItem) => {
          return (
              <div key={cartItem.id} >
                  <h1>Name: {cartItem.name}</h1>
                  <p>{cartItem.description ? <h4>Description: {cartItem.description}</h4> : null}</p>
                <div>
                    ${cartItem.price}
                </div>
                <UpdatePublicItem cartItemId={cartItem.id} guestCart={guestCart} setGuestCart={setGuestCart} isLoggedIn={isLoggedIn}/>
                <DeletePublicItem cartItemId={cartItem.id} guestCart={guestCart} setGuestCart={setGuestCart}/>
              </div>
          )
      })

    return (
        <div>
            <div>
                <PublicSum guestCart={guestCart}/>
            </div>
            {notUserCart}
        </div>
    )
}
export default PublicCart