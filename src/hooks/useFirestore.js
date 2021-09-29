import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useFirestore = (collection, condition) => {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    let collectionRef = db.collection(collection).orderBy("createAt");
    if (!condition.compareValue || !condition.compareValue.length) return;
    collectionRef.where(
      condition.fieldName,
      condition.operator,
      condition.compareValue
    );
    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(documents);
    });
    return unsubscribe;
  }, [collection, condition]);
  return documents;
};
export default useFirestore;
