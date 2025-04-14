from flask import Flask, request, jsonify
from flask_cors import CORS
from web3 import Web3

app = Flask(__name__)
CORS(app)

# Connect to Ganache
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545"))

# ✅ Your new funded Ganache wallet
SENDER_ADDRESS = "0x1E79aE52d6210f8d963586F6f4b82F8fA5B6146F"
PRIVATE_KEY = "0x582aec054003f7e3ce5e0072a352557096eb6c92d1902efbf486418b6b44dd7b"

@app.route("/api/pay", methods=["POST"])
def pay():
    try:
        data = request.get_json()
        seller = data.get("seller")
        price = float(data.get("price"))

        if not Web3.is_address(seller):
            raise ValueError("Invalid recipient wallet address.")

        to = Web3.to_checksum_address(seller)
        nonce = w3.eth.get_transaction_count(SENDER_ADDRESS)

        tx = {
            "nonce": nonce,
            "to": to,
            "value": w3.to_wei(price, "ether"),
            "gas": 21000,
            "gasPrice": w3.to_wei("10", "gwei"),
            "chainId": 1337  # Ganache default
        }

        signed_tx = w3.eth.account.sign_transaction(tx, private_key=PRIVATE_KEY)
        tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)

        return jsonify({"txHash": w3.to_hex(tx_hash)}), 200

    except Exception as e:
        print("❌ Payment failed:", str(e))
        return jsonify({"error": str(e)}), 500

@app.route("/", methods=["GET"])
def home():
    return "✅ Flask backend is running!"

if __name__ == "__main__":
    app.run(port=5000, debug=True)
