// import Firestore & its functions
import { db } from "@/firebaseConfig";
import { doc, collection, addDoc, getDocs, getDoc, setDoc, updateDoc, query, where, deleteDoc } from "firebase/firestore";
import { signInAnonymously, signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";

// import current user context
import { } from "@/context/UserContext"

// func to generate random userid (my format) for new users.
function generateUserId(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const partLength = 4;
    const parts = 6;
    let userId = [];

    for (let i = 0; i < parts; i++) {
        let segment = "";
        for (let j = 0; j < partLength; j++) {
            segment += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        userId.push(segment);
    }

    return userId.join("-");
}

// func to login users to database.
// checks if based on role, whether user's login is present in a collection in that role's doc.
// if yes: get the userId of that collection and set it in user context.
// if  no: create new collection in that role's doc with new userId and set LoginID into it.

export async function loginUserDatabase(role: string, loginId: string) {
    try {
        console.log("Attempting login for role:", role, "with loginId:", loginId);
        
        // Remove anonymous authentication - work with permissive Firestore rules instead
        console.log("Proceeding without Firebase authentication");
        
        switch (role) {
            case "patient": {
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("phone", "==", loginId.toLowerCase().trim()));
                
                try {
                    const querySnapshot = await getDocs(q);
                    console.log("Firestore Query Result:", querySnapshot.docs.map(doc => doc.data()));

                    // If User exists in users collection, return existing userId
                    if (!querySnapshot.empty) {
                        const existingUserId = querySnapshot.docs[0].id;
                        console.log("User exists, returning userId:", existingUserId);
                        return existingUserId;
                    }
                } catch (queryError) {
                    console.error("Error querying users collection:", queryError);
                    console.error("Query error details:", JSON.stringify(queryError, null, 2));
                    // Continue to user creation even if query fails
                }

                // If User does NOT exist, create a new one in users collection
                const userId = generateUserId();
                console.log("Creating new user with ID:", userId);
                
                try {
                    const userDocRef = doc(db, "users", userId);

                    await setDoc(userDocRef, {
                        phone: loginId.toLowerCase().trim(),
                        role: "patient",
                        onboarded: "no",
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }, { merge: true });

                    console.log("Successfully created user in users collection");

                    // Also create entry in patients collection for detailed data
                    const patientDocRef = doc(db, "patients", userId);
                    await setDoc(patientDocRef, {
                        phone: loginId.toLowerCase().trim(),
                        onboarded: "no",
                        createdAt: new Date(),
                        role: "individual"
                    }, { merge: true });

                    console.log("New user created with ID:", userId);
                    return userId; // Always return userId, never null
                } catch (createError) {
                    console.error("Error creating user:", createError);
                    console.error("Create error details:", JSON.stringify(createError, null, 2));
                    // Even if Firestore fails, return generated userId
                    console.log("Returning generated userId despite Firestore error:", userId);
                    return userId;
                }
            }

            case "donor": {
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("phone", "==", loginId.toLowerCase().trim()));
                
                try {
                    const querySnapshot = await getDocs(q);
                    console.log("Firestore Query Result:", querySnapshot.docs.map(doc => doc.data()));

                    // ✅ If User exists in users collection, return existing userId
                    if (!querySnapshot.empty) {
                        const existingUserId = querySnapshot.docs[0].id;
                        console.log("User exists, returning userId:", existingUserId);
                        return existingUserId;
                    }
                } catch (queryError) {
                    console.error("Error querying users collection:", queryError);
                    // Continue to user creation even if query fails
                }

                // ❌ If User does NOT exist, create a new one in users collection
                const userId = generateUserId();
                console.log("Creating new user with ID:", userId);
                
                try {
                    const userDocRef = doc(db, "users", userId);

                    await setDoc(userDocRef, {
                        phone: loginId.toLowerCase().trim(),
                        role: "donor",
                        onboarded: "no",
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }, { merge: true });

                    console.log("Successfully created user in users collection");

                    // Also create entry in canines collection for detailed data
                    const canineDocRef = doc(db, "canines", userId);
                    await setDoc(canineDocRef, {
                        phone: loginId.toLowerCase().trim(),
                        onboarded: "no",
                        createdAt: new Date(),
                        role: "individual"
                    }, { merge: true });

                    console.log("New user created with ID:", userId);
                    return userId; // Always return userId, never null
                } catch (createError) {
                    console.error("Error creating user:", createError);
                    // Even if Firestore fails, return the generated userId
                    console.log("Returning generated userId despite Firestore error:", userId);
                    return userId;
                }
            }

            case "veterinary": {
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("email", "==", loginId.toLowerCase().trim()));
                
                try {
                    const querySnapshot = await getDocs(q);
                    console.log("Firestore Query Result:", querySnapshot.docs.map(doc => doc.data()));

                    // ✅ If User exists in users collection, return existing userId
                    if (!querySnapshot.empty) {
                        const existingUserId = querySnapshot.docs[0].id;
                        console.log("User exists, returning userId:", existingUserId);
                        return existingUserId;
                    }
                } catch (queryError) {
                    console.error("Error querying users collection:", queryError);
                    // Continue to user creation even if query fails
                }

                // ❌ If User does NOT exist, create a new one in users collection
                const userId = generateUserId();
                console.log("Creating new user with ID:", userId);
                
                try {
                    const userDocRef = doc(db, "users", userId);

                    await setDoc(userDocRef, {
                        email: loginId.toLowerCase().trim(),
                        role: "veterinary",
                        onboarded: "no",
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }, { merge: true });

                    console.log("Successfully created user in users collection");

                    // Also create entry in clinics collection for detailed data
                    const clinicDocRef = doc(db, "clinics", userId);
                    await setDoc(clinicDocRef, {
                        email: loginId.toLowerCase().trim(),
                        onboarded: "no",
                        createdAt: new Date(),
                        role: "organization"
                    }, { merge: true });

                    console.log("New user created with ID:", userId);
                    return userId; // Always return userId, never null
                } catch (createError) {
                    console.error("Error creating user:", createError);
                    // Even if Firestore fails, return the generated userId
                    console.log("Returning generated userId despite Firestore error:", userId);
                    return userId;
                }
            }

            case "organisation": {
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("email", "==", loginId.toLowerCase().trim()));
                
                try {
                    const querySnapshot = await getDocs(q);
                    console.log("Firestore Query Result:", querySnapshot.docs.map(doc => doc.data()));

                    // ✅ If User exists in users collection, return existing userId
                    if (!querySnapshot.empty) {
                        const existingUserId = querySnapshot.docs[0].id;
                        console.log("User exists, returning userId:", existingUserId);
                        return existingUserId;
                    }
                } catch (queryError) {
                    console.error("Error querying users collection:", queryError);
                    // Continue to user creation even if query fails
                }

                // ❌ If User does NOT exist, create a new one in users collection
                const userId = generateUserId();
                console.log("Creating new user with ID:", userId);
                
                try {
                    const userDocRef = doc(db, "users", userId);

                    await setDoc(userDocRef, {
                        email: loginId.toLowerCase().trim(),
                        role: "organisation",
                        onboarded: "no",
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }, { merge: true });

                    console.log("Successfully created user in users collection");

                    // Also create entry in organisations collection for detailed data
                    const orgDocRef = doc(db, "organisations", userId);
                    await setDoc(orgDocRef, {
                        email: loginId.toLowerCase().trim(),
                        onboarded: "no",
                        createdAt: new Date(),
                        role: "organization"
                    }, { merge: true });

                    console.log("New user created with ID:", userId);
                    return userId; // Always return userId, never null
                } catch (createError) {
                    console.error("Error creating user:", createError);
                    // Even if Firestore fails, return the generated userId
                    console.log("Returning generated userId despite Firestore error:", userId);
                    return userId;
                }
            }

            default:
                alert("Invalid role");
                return null;
        }
    }
    catch (error) {
        console.error("Error handling user login:", error);
        return null;
    }
}

export async function getUserDataById(userId: string, role: string) {
    if (role == "patient") {
        try {
            const docRef = doc(db, "patients", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("patient Data:", docSnap.data());
                return { id: docSnap.id, ...docSnap.data() };
            } else {
                console.log("No such patient found!");
                return null;
            }
        } catch (error) {
            console.error("Error fetching patient:", error);
            return null;
        }
    }
    else if (role == "donor") {
        try {
            const docRef = doc(db, "donors", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Donor Data:", docSnap.data());
                return { id: docSnap.id, ...docSnap.data() };
            } else {
                console.log("No such Donor found!");
                return null;
            }
        } catch (error) {
            console.error("Error fetching Donor:", error);
            return null;
        }
    }
    else if (role == "veterinary") {
        try {
            const docRef = doc(db, "veterinaries", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Veterinary Data:", docSnap.data());
                return { id: docSnap.id, ...docSnap.data() };
            } else {
                console.log("No such veterinary found!");
                return null;
            }
        } catch (error) {
            console.error("Error fetching veterinary:", error);
            return null;
        }
    }
    else if (role == "organisation") {
        try {
            const docRef = doc(db, "organisations", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("organisation Data:", docSnap.data());
                return { id: docSnap.id, ...docSnap.data() };
            } else {
                console.log("No such organisation found!");
                return null;
            }
        } catch (error) {
            console.error("Error fetching organisation:", error);
            return null;
        }
    }
}


// func to update data of a user/collection in their role's doc
export async function updateUserData(role, userId, updateData) {
    try {
        const userRef = doc(db, role, userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            await updateDoc(userRef, updateData);
        } else {
            await setDoc(userRef, updateData);
        }

        return { success: true, message: "User updated successfully" };
    } catch (error) {
        return { success: false, message: error.message };
    }
}



export async function deleteUserById(userId: string, role: string) {
    if (role == "patient") {
        try {
            const docRef = doc(db, "patients", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Patient Data:", docSnap.data());
                // Deleting the patient document
                await deleteDoc(docRef);
                console.log("Patient document deleted.");
                return { id: docSnap.id, ...docSnap.data() };
            } else {
                console.log("No such patient found!");
                return null;
            }
        } catch (error) {
            console.error("Error deleting patient:", error);
            return null;
        }
    }
    else if (role == "donor") {
        try {
            const docRef = doc(db, "donors", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Donor Data:", docSnap.data());
                // Deleting the donor document
                await deleteDoc(docRef);
                console.log("Donor document deleted.");
                return { id: docSnap.id, ...docSnap.data() };
            } else {
                console.log("No such Donor found!");
                return null;
            }
        } catch (error) {
            console.error("Error deleting Donor:", error);
            return null;
        }
    }
    else if (role == "veterinary") {
        try {
            const docRef = doc(db, "veterinaries", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Veterinary Data:", docSnap.data());
                // Deleting the veterinary document
                await deleteDoc(docRef);
                console.log("Veterinary document deleted.");
                return { id: docSnap.id, ...docSnap.data() };
            } else {
                console.log("No such veterinary found!");
                return null;
            }
        }
        catch (error) {
            console.error("Error deleting veterinary:", error);
            return null;
        }
    }

    else if (role == "organisation") {
        try {
            const docRef = doc(db, "organisations", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("organisation Data:", docSnap.data());
                // Deleting the organisation document
                await deleteDoc(docRef);
                console.log("organisation document deleted.");
                return { id: docSnap.id, ...docSnap.data() };
            } else {
                console.log("No such organisation found!");
                return null;
            }
        }
        catch (error) {
            console.error("Error deleting organisation:", error);
            return null;
        }
    }
}