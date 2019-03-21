package stringComparison;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

import org.junit.Test;

public class MainTest {
	@Test
	public void noArgument() {
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		System.setOut(new PrintStream(out));
		String[] args = {};
		Main.main(args);

		assertThat(out.toString(), is("ERROR" + System.lineSeparator()));
	}

	@Test
	public void noSecondArgument() {
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		System.setOut(new PrintStream(out));
		String[] args = { "s1" };
		Main.main(args);

		assertThat(out.toString(), is("ERROR" + System.lineSeparator()));
	}

	@Test
	public void isSame() {
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		System.setOut(new PrintStream(out));
		String[] args = { "s1", "s1" };
		Main.main(args);

		assertThat(out.toString(), is("YES" + System.lineSeparator()));
	}

	@Test
	public void isDifferent() {
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		System.setOut(new PrintStream(out));
		String[] args = { "s1", "s2" };
		Main.main(args);

		assertThat(out.toString(), is("NO" + System.lineSeparator()));
	}
}
