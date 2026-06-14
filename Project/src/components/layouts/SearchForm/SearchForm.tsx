import { Button, Input } from "@/components/ui";
import {
  FC,
  FormHTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { SearchModal } from "../SearchModal";
import { useForm, useWatch } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./search-form.scss";

const SearchFormScheme = z.object({
  search: z.string(),
});

type SearchFormType = z.infer<typeof SearchFormScheme>;

interface SearchFormProps extends FormHTMLAttributes<HTMLFormElement> {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const SearchForm: FC<SearchFormProps> = memo(
  ({ isOpen, onOpen, onClose }) => {
    const { register, handleSubmit, control, reset } = useForm<SearchFormType>({
      resolver: zodResolver(SearchFormScheme),
    });

    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchValue = useWatch({ control, name: "search", defaultValue: "" });

    const { ref: registerRef, ...registerProps } = register("search");

    const handleReset = useCallback(() => {
      reset();
      searchInputRef.current?.focus();
    }, [reset, searchInputRef]);

    useEffect(() => {
      if (isOpen) {
        searchInputRef.current?.focus();
      }
    }, [isOpen]);

    return (
      <form
        className={`search-form ${isOpen ? "is-open" : ""}`}
        onSubmit={handleSubmit(() => {})}
      >
        <div className="search-form__overlay" onClick={onClose}></div>
        <div className="search-form__inner">
          <Input
            {...registerProps}
            ref={(e) => {
              registerRef(e);
              searchInputRef.current = e;
            }}
            type="search"
            id="input-search"
            placeholder="Поиск"
            iconId="icon-search"
            autoComplete="off"
            onFocus={onOpen}
            onBlur={onClose}
          >
            {searchValue && (
              <Button
                className="custom-input__reset-btn"
                type="button"
                onClick={handleReset}
              >
                <svg
                  className="custom-input__icon custom-input__icon--reset"
                  width={24}
                  height={24}
                >
                  <use xlinkHref="/sprite.svg#icon-reset" />
                </svg>
              </Button>
            )}
          </Input>
        </div>
        {isOpen && searchValue && <SearchModal searchRequest={searchValue} />}
      </form>
    );
  },
);
