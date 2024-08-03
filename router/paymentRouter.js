const express = require("express")
const Razorpay = require("razorpay")
const router = express.Router()
const crypto = require("crypto")
// require("dotenv").config()

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRET
})

router.post('/order', (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: Number(amount * 1),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json({ data: order });
            console.log(order)
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
})

router.post('/verify', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    try {
        // Create Sign
        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        // Create ExpectedSign
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign.toString())
            .digest("hex");

        const isAuthentic = expectedSign === razorpay_signature;
        if (isAuthentic) {
            const payment = new PaymentMethodChangeEvent({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            });
            // Save payment 
            await payment.save()
            // send message
            res.json({ message: "Payment Successful" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
})

module.exports = router