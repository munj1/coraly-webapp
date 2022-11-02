import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const NavMenu = ({ isAdmin }: { isAdmin: boolean }) => {
  const router = useRouter();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <MenuItem onClick={() => router.push("/collections")}>
          Collections
        </MenuItem>
        <MenuItem onClick={() => router.push("/artists")}>Artists</MenuItem>
        {isAdmin && (
          <>
            <MenuItem onClick={() => router.push("/admin")}>
              Admin - on chain
            </MenuItem>
            <MenuItem onClick={() => router.push("/admin2")}>
              Admin - off chain
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default NavMenu;
