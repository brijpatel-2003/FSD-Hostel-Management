package com.example.hostel.controller;

import com.example.hostel.stripePayment.CheckoutPayment;
import com.google.gson.Gson;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin
public class StripeController {
    // create a Gson object
    private static Gson gson = new Gson();



    @PostMapping("/payment")
    /**
     * Payment with Stripe checkout page
     *
     * @throws StripeException
     */
    public String paymentWithCheckoutPage(@RequestBody CheckoutPayment payment) throws StripeException {
        // We initilize stripe object with the api key
        init();


        // We create a  stripe session parameters
        SessionCreateParams params = SessionCreateParams.builder()
                // We will use the credit card payment method
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT).setSuccessUrl(payment.getSuccessUrl())
                .setCancelUrl(
                        payment.getCancelUrl())
                .addLineItem(
                        SessionCreateParams.LineItem.builder().setQuantity(payment.getQuantity())
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency(payment.getCurrency()).setUnitAmount(payment.getAmount())
                                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData
                                                        .builder().setName(payment.getName()).build())
                                                .build())
                                .build())
                .build();
        // create a stripe session
        Session session = Session.create(params);
        Map<String, String> responseData = new HashMap<>();


        System.out.println(session.getPaymentStatus()+ " "+session.getStatus()+" "+session.getId());

        // We get the sessionId and we putted inside the response data you can get more info from the session object
        responseData.put("id", session.getId());
        // We can return only the sessionId as a String
        return gson.toJson(responseData);
    }

    private void init() {


//        Stripe.apiKey ="sk_test_51OegoCSHej2iRk34siTTwBhSn8X9M2TpJj6Fgf3bNilMvB4PWXU1mYKbUeAih47JM6uHoYVDtdgCBs6I8lxjc0A700uJXJ2ssM";
       Stripe.apiKey ="sk_test_51OegoCSHej2iRk34siTTwBhSn8X9M2TpJj6Fgf3bNilMvB4PWXU1mYKbUeAih47JM6uHoYVDtdgCBs6I8lxjc0A700uJXJ2ssM";

    }
}


