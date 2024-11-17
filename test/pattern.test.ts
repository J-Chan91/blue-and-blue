import { describe, expect, test } from "vitest";

import { pattern } from "../lib/pattern";

describe("입력 유효성 검사", () => {
  describe.todo("unimplemented suite");

  describe("아이디 유효성 검사", () => {
    test("영소문자 단독 4자 이상일 경우 통과합니다.", () => {
      expect(pattern.id.test("abcd")).toBeTruthy();
    });

    test("숫자 단독 4자 이상일 경우 통과합니다.", () => {
      expect(pattern.id.test("1234")).toBeTruthy();
    });

    test("영소문자 + 숫자 4자 이상일 경우 통과합니다.", () => {
      expect(pattern.id.test("asd1")).toBeTruthy();
    });

    test("영소문자 단독 16자 이하일 경우 통과합니다.", () => {
      expect(pattern.id.test("abcdefghasdddwdq")).toBeTruthy();
    });

    test("숫자 단독 16자 이하일 경우 통과합니다.", () => {
      expect(pattern.id.test("1234123412341234")).toBeTruthy();
    });

    test("영소문자 + 숫자 16자 이하일 경우 통과합니다.", () => {
      expect(pattern.id.test("asd1asd1asd1asd1")).toBeTruthy();
    });

    test("4자 미만일 경우 실패합니다.", () => {
      expect(pattern.id.test("abc")).toBeFalsy();
      expect(pattern.id.test("12")).toBeFalsy();
    });

    test("16자 초과일 경우 실패합니다.", () => {
      expect(pattern.id.test("abcdefghijklmnopq")).toBeFalsy();
      expect(pattern.id.test("12345678901234567")).toBeFalsy();
    });

    test("특수 문자가 포함된 경우 실패합니다.", () => {
      expect(pattern.id.test("abc$")).toBeFalsy();
      expect(pattern.id.test("123#")).toBeFalsy();
      expect(pattern.id.test("a1!a")).toBeFalsy();
    });

    test("대문자가 포함된 경우 실패합니다.", () => {
      expect(pattern.id.test("Abcd")).toBeFalsy();
      expect(pattern.id.test("aBc1")).toBeFalsy();
    });

    test("공백은 허용하지 않습니다.", () => {
      expect(pattern.id.test(" ")).toBeFalsy();
      expect(pattern.id.test("a bcd")).toBeFalsy();
      expect(pattern.id.test("1234 ")).toBeFalsy();
    });
  });

  describe("비밀번호 검사", () => {
    test("비밀번호가 영소문자 + 숫자 + 특수문자, 4-16자 이내일 경우 통과합니다.", () => {
      expect(pattern.password.test("abcd123!!")).toBeTruthy();
    });

    test("비밀번호가 영소문자 단독일 경우 4-16자 이내라도 실패합니다.", () => {
      expect(pattern.password.test("abcd")).toBeFalsy();
    });

    test("비밀번호가 숫자 단독일 경우 4-16자 이내라도 실패합니다.", () => {
      expect(pattern.password.test("1234")).toBeFalsy();
    });

    test("비밀번호가 특수문자 단독일 경우 4-16자 이내라도 실패합니다.", () => {
      expect(pattern.password.test("!!!!")).toBeFalsy();
    });

    test("비밀번호가 영소문자 + 숫자 + 특수문자 포함하여도 4자 미만일 경우 실패합니다.", () => {
      expect(pattern.password.test("a1!")).toBeFalsy();
    });

    test("비밀번호가 영소문자 + 숫자 + 특수문자 포함하여도 16자 초과일 경우 실패합니다.", () => {
      expect(pattern.password.test("a1!a1!a1!a1!a1!a1!")).toBeFalsy();
    });

    test("비밀번호가 대문자를 포함하면 실패합니다.", () => {
      expect(pattern.password.test("Abcd123!")).toBeFalsy();
    });

    test("비밀번호에 공백이 포함된 경우 실패합니다.", () => {
      expect(pattern.password.test("abcd 123!")).toBeFalsy();
    });
  });
});
