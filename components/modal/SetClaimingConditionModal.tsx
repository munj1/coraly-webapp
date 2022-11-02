import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Center,
  VStack,
  Heading,
  Spinner,
  Text,
  Input,
  HStack,
} from "@chakra-ui/react";
import {
  useClaimConditions,
  useContract,
  useSetClaimConditions,
} from "@thirdweb-dev/react";
import { ERC1155_ADDRESS, USDT_ADDRESS } from "../../utils/consts";
import { ClaimConditionInput } from "@thirdweb-dev/sdk";
import { useEffect, useState } from "react";

const SetClaimingConditionModal = ({ onClose, targetERC1155 }) => {
  const [isSetting, setIsSetting] = useState(false);
  const [claimConditionInput, setClaimConditionInput] =
    useState<ClaimConditionInput>({
      quantityLimitPerTransaction: "unlimited",
      startTime: new Date(),
      price: 0,
      currencyAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      maxQuantity: "unlimited",
      waitInSeconds: "0",
    });

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === "startTime") {
      value = new Date(value);
    }
    setClaimConditionInput((prev) => ({ ...prev, [name]: value }));
  };

  const { contract } = useContract(ERC1155_ADDRESS, "edition-drop");
  const {
    data: claimConditions,
    isLoading: isLoadingFetching,
    error: isErrorFetching,
  } = useClaimConditions(contract, targetERC1155);

  useEffect(() => {
    if (!claimConditions) return;
    if (claimConditions?.length > 0) {
      setClaimConditionInput({
        quantityLimitPerTransaction:
          claimConditions[0].quantityLimitPerTransaction,
        startTime: claimConditions[0].startTime,
        price: (
          claimConditions[0].price.div(10 ** 6).toNumber() /
          10 ** 12
        ).toString(),
        currencyAddress: claimConditions[0].currencyAddress,
        maxQuantity: claimConditions[0].maxQuantity,
        waitInSeconds: claimConditions[0].waitInSeconds.toString(),
      });
    }
  }, [claimConditions, isErrorFetching, isLoadingFetching]);

  // useEffect(() => {
  //   if (claimConditionInput)
  //     console.log("claimConditionInput", claimConditionInput);
  // }, [claimConditionInput]);

  const handleSetClaimConditions = async () => {
    setIsSetting(true);
    try {
      await contract.claimConditions.set(targetERC1155, [
        { ...claimConditionInput },
      ]);
    } catch (e) {
      alert("error setting");
    }
    setIsSetting(false);
  };

  const handleDeleteClaimConditions = async () => {
    setIsSetting(true);
    try {
      await contract.claimConditions.set(parseInt(targetERC1155), []);
    } catch (e) {
      alert("error deleting");
    }
    setIsSetting(false);
  };

  if (isLoadingFetching || isErrorFetching) {
    return (
      <ModalContent>
        <ModalBody>
          {isLoadingFetching && <Spinner />}
          {isErrorFetching && <Text>error fetching claim condition</Text>}
        </ModalBody>
      </ModalContent>
    );
  }

  return (
    <ModalContent>
      <ModalHeader>Set Claiming Condition for #{targetERC1155}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {claimConditions && claimConditions.length > 0 && (
          <Text fontWeight={"extrabold"}>
            이미 설정한 값이 있습니다. 수정 또는 삭제 하시겠습니까?
          </Text>
        )}

        <VStack>
          <Text>Sale start time (한국시간 기준, 처음 양식 맞춰서)</Text>
          <Input
            name="startTime"
            onChange={handleInputChange}
            defaultValue={claimConditionInput?.startTime.toLocaleString(
              "en-KR"
            )}
          />
          <Text>Price (ex. 1 = 1ETH) </Text>
          <Input
            name="price"
            type="number"
            onChange={handleInputChange}
            value={claimConditionInput?.price}
          />

          <Text>
            Currency Address - 0xeee... 는 native토큰(eth,poly등) 을 의미함
          </Text>
          <Text fontSize={"xs"}>Test USDT Address: {USDT_ADDRESS}</Text>
          <Input
            name="currencyAddress"
            type="text"
            value={claimConditionInput?.currencyAddress}
            onChange={handleInputChange}
          />
          <Text>Max Quantity - 총 claim 가능한 수량</Text>
          <Input
            name="maxQuantity"
            type="string"
            value={claimConditionInput?.maxQuantity}
            onChange={handleInputChange}
          />

          <Text>
            Quantity Limit Per Transaction - 한번 실행에 구매가능 수량,
            unlimited 입력시 무제한
          </Text>
          <Input
            name="quantityLimitPerTransaction"
            type="stirng"
            value={claimConditionInput?.quantityLimitPerTransaction}
            onChange={handleInputChange}
          />

          <Text>
            Wait in Seconds - unlimited 입력시, 1회만 구매가능, 0입력시 제한없음
          </Text>
          <Input
            name="waitInSeconds"
            type="string"
            value={claimConditionInput?.waitInSeconds as string}
            onChange={handleInputChange}
          />
        </VStack>
      </ModalBody>

      <ModalFooter>
        <HStack>
          <Button
            colorScheme={"blue"}
            onClick={handleSetClaimConditions}
            isLoading={isSetting}
          >
            Set
          </Button>
          <Button
            colorScheme={"red"}
            onClick={handleDeleteClaimConditions}
            isLoading={isSetting}
          >
            Delete
          </Button>
        </HStack>
      </ModalFooter>
    </ModalContent>
  );
};

export default SetClaimingConditionModal;

// quantityLimitPerTransaction?: string | number;
//     startTime?: Date;
//     price?: string | number;
//     currencyAddress?: string;
//     maxQuantity?: string | number;
//     waitInSeconds?: string | number | bigint | BigNumber;
