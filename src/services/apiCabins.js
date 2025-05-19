import supabase, { supabaseUrl } from "./superbase";

export const getCabin = async function () {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Could not load cabin");
  }

  return data;
};

export const deleteCabin = async function (id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Could not delete cabin");
  }

  return data;
};
//https://kpesqywafsbegufuwnbp.supabase.co/storage/v1/object/public/cabins//0.7211612059545434-cabin-006.jpg
//https://kpesqywafsbegufuwnbp.supabase.co/storage/v1/object/public/cabins//cabin-001.jpg
export const createEditCabin = async function (newCabin, id) {
  // console.log(newCabin, "image");

  const isImageString = typeof newCabin.image === "string";
  let imageFile, imageName, imagePath;

  if (isImageString) {
    imagePath = newCabin.image;
  } else {
    imageFile = newCabin.image[0];
    imageName = `${Math.random()}-${imageFile.name}`.replace("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;
  }
  //insering image
  // const { data, error } = await supabase
  //   .from("cabins")
  //   .insert([{ ...newCabin, image: imagePath }])
  //   .select();

  let data, error;

  if (!id) {
    ({ data, error } = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single());
  } else {
    ({ data, error } = { data, error } = await supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select()
      .single());
  }

  //adding image to bucket/storage

  if (!isImageString) {
    const { error: storageError } = await supabase.storage
      .from("cabins")
      .upload(imageName, imageFile);

    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data[0]?.id);
      console.log(storageError);
      throw new Error("Cabin was not created");
    }

    if (error) {
      console.log(error);
      throw new Error("Could not create cabin");
    }

    return data;
  }
};
