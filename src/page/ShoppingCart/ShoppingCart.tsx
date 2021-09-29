import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { deleteShopingCart } from "../../features/shopingCart/shopingCartSlice";
import addDocument from "../../firebase/service/addDocument"; // add db

function ShoppingCart() {
  const dispatch = useAppDispatch();
  let { uid }: any = useParams();
  const { dataShopingCart } = useAppSelector((state: RootState) => {
    return state.shopingCartReducer;
  });
  const [totalMoney, setTotalMoney] = useState(0);
  const { isLogin, dataUser } = useAppSelector(
    (state: RootState) => state.authReducer
  );

  const history = useHistory();
  useEffect(() => {
    if (!isLogin) {
      history.push("/signin");
    }
  }, [history, isLogin]);
  const useDataShopingCart = useMemo(() => {
    // let result = 0;
    // for (let i = 0; i < useDataShopingCart.length; i++) {
    //   result = result + useDataShopingCart[i].quantity;
    // }
    // setTotalMoney(result);
    return dataShopingCart.map((item: any) => {
      return {
        id: item.id,
        quantity: 1,
        price: item.price,
      };
    });
  }, [dataShopingCart]);
  // useMemo(() => {
  //   let result = 0;
  //   for (let i = 0; i < useDataShopingCart.length; i++) {
  //     result = result + useDataShopingCart[i].quantity;
  //   }
  //   console.log(result);
  //   setTotalMoney(result);
  // }, [useDataShopingCart, dataShopingCart]);

  console.log(useDataShopingCart);

  return (
    <>
      <section>
        <div className="container">
          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">hình ảnh</th>
                <th scope="col">số lượng</th>
                <th scope="col">Giá tiền</th>
                <th scope="col">Xoá sản phẩm</th>
              </tr>
            </thead>
            <tbody>
              {dataShopingCart.map((item: any) => (
                <tr>
                  <th scope="row">1</th>
                  <td>{item?.productName}</td>
                  <td>
                    <img
                      className="card-img-top img-responsive"
                      src={item.image}
                      alt="product"
                      style={{ height: "auto", width: "80px" }}
                    />
                  </td>
                  <td className="input-group">
                    <input
                      style={{ maxWidth: "60px" }}
                      className=" form-control"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        useDataShopingCart.map((product: any) => {
                          if (product.id === item.id) {
                            return (product.quantity = e.target.value);
                          }
                          return product;
                        });
                        let result = 0;
                        for (let i = 0; i < useDataShopingCart.length; i++) {
                          result =
                            result +
                            Number(
                              useDataShopingCart[i].quantity *
                                useDataShopingCart[i].price
                            );
                        }
                        console.log(result);
                        setTotalMoney(result);
                      }}
                    />
                  </td>
                  <td>{item?.price} VNĐ</td>
                  <td>
                    <i
                      className="far fa-trash-alt"
                      onClick={() =>
                        dispatch({
                          type: deleteShopingCart.type,
                          payload: item,
                        })
                      }
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row d-flex justify-content-end mt-5 p-5">
            <p className="pt-1 mr-2">
              Tổng số tiền phải thanh toán : {totalMoney} VNĐ
            </p>
            <button
              className="btn btn-primary text-white"
              onClick={() => {
                console.log(uid);
                addDocument("orders", {
                  User: dataUser,
                  order: useDataShopingCart,
                });
              }}
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ShoppingCart;
