import { doc, updateDoc, increment } from "firebase/firestore";

/**
 *
 * @param { id, amount, db }
 */
export const incrementSupply = async ({ id, amount, db }) => {
  try {
    const salesRef = doc(db, "sales", id);
    await updateDoc(salesRef, {
      amount: increment(amount),
    });
    console.log("incrementSupply success");
  } catch (e) {
    console.log(e);
  }
};
