package Search;

import org.springframework.data.jpa.domain.Specification;

import com.example.estate.entity.Orders;

public class OrdersSpecifications {

    public static Specification<Orders> hasOrderCode(Long orderCode) {
        return (orders, cq, cb) -> cb.equal(orders.get("orderCode"), orderCode);
    }

    public static Specification<Orders> hasUserCode(Long userCode) {
        return (orders, cq, cb) -> cb.equal(orders.get("user").get("userCode"), userCode);
    }

    public static Specification<Orders> hasProductCode(Long productCode) {
        return (orders, cq, cb) -> cb.equal(orders.get("product").get("productCode"), productCode);
    }

    public static Specification<Orders> hasShippingAddress(String shippingAddress) {
        return (orders, cq, cb) -> cb.like(cb.lower(orders.get("shippingAddress")), "%" + shippingAddress.toLowerCase() + "%");
    }

    public static Specification<Orders> hasOrderStatus(String orderStatus) {
        return (orders, cq, cb) -> cb.like(cb.lower(orders.get("orderStatus")), "%" + orderStatus.toLowerCase() + "%");
    }

    public static Specification<Orders> hasRefundReason(String refundReason) {
        return (orders, cq, cb) -> cb.like(cb.lower(orders.get("refundReason")), "%" + refundReason.toLowerCase() + "%");
    }

    public static Specification<Orders> hasRequest(String request) {
        return (orders, cq, cb) -> cb.like(cb.lower(orders.get("request")), "%" + request.toLowerCase() + "%");
    }

    public static Specification<Orders> hasOrderPrice(String orderPrice) {
        return (orders, cq, cb) -> cb.equal(orders.get("orderPrice"), orderPrice);
    }

    public static Specification<Orders> hasRefundState(String refundState) {
        return (orders, cq, cb) -> cb.like(cb.lower(orders.get("refundState")), "%" + refundState.toLowerCase() + "%");
    }

    public static Specification<Orders> hasProductSize(String productSize) {
        return (orders, cq, cb) -> cb.like(cb.lower(orders.get("productSize")), "%" + productSize.toLowerCase() + "%");
    }

    public static Specification<Orders> hasProductColor(String productColor) {
        return (orders, cq, cb) -> cb.like(cb.lower(orders.get("productColor")), "%" + productColor.toLowerCase() + "%");
    }

    public static Specification<Orders> hasReviewCheck(Boolean reviewCheck) {
        return (orders, cq, cb) -> cb.equal(orders.get("reviewCheck"), reviewCheck);
    }

    public static Specification<Orders> hasImpUid(String impUid) {
        return (orders, cq, cb) -> cb.equal(orders.get("impUid"), impUid);
    }
}
