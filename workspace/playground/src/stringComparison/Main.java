package stringComparison;

public class Main {
	/**
	 * mainメソッドの引数に文字列S1と文字列S2与えられます。
	 * S1とS2が同じ場合は標準出力にYES、
	 * 異なる場合はNOと出力してください。
	 *
	 * @param args
	 */
	public static void main(String args[]) {
		if (args.length < 2) {
			System.out.println("ERROR");
			return;
		}

		String s1 = args[0];
		String s2 = args[1];
		System.out.println(s1.equals(s2) ? "YES" : "NO");
	}
}
