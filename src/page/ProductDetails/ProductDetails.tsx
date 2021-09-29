import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getShopingCart } from "../../features/shopingCart/shopingCartSlice";

const ProductDetails = () => {
  let { id }: any = useParams();
  const { dataProducts } = useAppSelector((state: RootState) => {
    return state.productsReducer;
  });
  const dispatch = useAppDispatch();

  const [productDetail, setProductDetail] = useState<any[]>([]);
  useEffect(() => {
    const result = dataProducts.filter((item: any) => item.id === `${id}`); // filter id product

    // db.collection("products").onSnapshot((snapshot: any) => {
    //   const data = snapshot.docs.map((doc: any) => ({
    //     ...doc.data(),
    //     id: doc.id,
    //   }));
    //   const result = data.filter((item: any) => item.id == `${id}`); // filter id product
    //   console.log(result);
    setProductDetail(result);
    console.log("dataProducts", productDetail[0]?.productName);
    // });
  }, [dataProducts, id]);
  // const temp = productDetail[0];
  // console.log("ping", temp.image);
  return (
    <>
      <section>
        <div className="container">
          <div className="row p-5  ">
            <div className="col-6">
              <img src={productDetail[0]?.image} alt="productDetail" />
            </div>
            <div className="col-6">
              <h2>{productDetail[0]?.productName}</h2>
              <p>{productDetail[0]?.category}</p>
              <p>Thông số kĩ thuật :{productDetail[0]?.description}</p>

              <p>{productDetail[0]?.price} VNĐ</p>
              <button
                className="btn btn-danger text-white"
                onClick={() =>
                  dispatch({
                    type: getShopingCart.type,
                    payload: productDetail[0],
                  })
                }
              >
                Thêm giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
