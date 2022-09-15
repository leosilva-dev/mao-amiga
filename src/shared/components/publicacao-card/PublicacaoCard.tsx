import React from "react";
import { Button, Text, Box, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import moment from "moment";
import "moment/locale/pt-br";
import { DeleteIcon } from "@chakra-ui/icons";
import { publicacaoService } from "../../service/api/publicacao/Publicacao";
import { Feedback } from "../../util/Feedback";
import { DeleteButton } from "../delete-button/DeleteButton";
import { QueroAjudarButton } from "../quero-ajudar-button/QueroAjudarButton";

interface IPublicacaoCardProps {
  title: string;
  ongName: string;
  nhost_id: string;
  created_at: string;
  description: string;
  publicacaoId: number;
  ongLogadaId?: number;
  ongPublicacaoId: number;
  render: boolean;
  setRender: (value: boolean) => void;
}

export const PublicacaoCard: React.FC<IPublicacaoCardProps> = ({
  title,
  ongName,
  nhost_id,
  created_at,
  description,
  publicacaoId,
  ongLogadaId,
  ongPublicacaoId,
  render,
  setRender,
}) => {
  const router = useRouter();

  const handleDeletePublication = async () => {
    const deletedWithSuccess = await publicacaoService.deleteById(publicacaoId);

    if (deletedWithSuccess) {
      Feedback("Publicação excluída com sucesso", "success");
      setRender(!render);
    } else {
      Feedback(
        "Ocorreu um erro ao excluir a sua publicação. Tente novamanete mais tarde...",
        "error"
      );
    }
  };

  return (
    <Box
      p="4"
      m="4"
      width={"full"}
      boxShadow="xl"
      borderRadius="md"
      _hover={{
        boxShadow: "2xl",
        transition: "all 0.5s ease-out",
      }}
    >
      <Box alignItems="center" marginBottom={2}>
        <Box display={"flex"} justifyContent="space-between">
          <Text
            fontSize={"md"}
            fontWeight="bold"
            color="blue.400"
            cursor={"pointer"}
            _hover={{
              color: "blue.600",
              transition: "all 0.5s ease-out",
            }}
            onClick={() => router.push(`/ong/${nhost_id}`)}
          >
            {ongName}
          </Text>
          {ongLogadaId === ongPublicacaoId && (
            <DeleteButton onDelete={handleDeletePublication} />
          )}
        </Box>
        <Text fontSize={"sm"}>{moment(created_at).fromNow()}</Text>
        <Text fontWeight="bold" fontSize={"2xl"}>
          {title}
        </Text>
      </Box>

      <Box marginBottom={5}>
        <Text fontSize={"lg"} textAlign={"left"} maxW={"6xl"}>
          {description}
        </Text>
      </Box>
      <Divider />
      <Box marginTop={2} display={"flex"} justifyContent="end">
        {/* <Button
          size={"sm"}
          color="white"
          bg={"primary"}
          _hover={{
            bg: "primaryHover",
          }}
          onClick={() => router.push(`/`)}
        >
          Quero ajudar
        </Button> */}
        <QueroAjudarButton ongId={ongPublicacaoId} />
      </Box>
    </Box>
  );
};
