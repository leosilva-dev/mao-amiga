import { createStandaloneToast } from "@chakra-ui/react"

export const Feedback = (title:string, status:"info" | "warning" | "success" | "error", description?:string):void => {

    const {toast} = createStandaloneToast();

    toast({
      title: title,
      description: description,
      status: status,
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });

}